/**
 * DeepSeek API Client via OpenRouter
 * 
 * This file provides a client for interacting with the DeepSeek API through OpenRouter.
 */

export interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class DeepSeekClient {
  private apiKey: string;
  private baseUrl: string;
  private modelPath: string;
  
  constructor(apiKey: string, modelPath: string = 'deepseek/deepseek-chat-v3-0324:free', baseUrl: string = 'https://openrouter.ai/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.modelPath = modelPath;
  }
  
  async chat(messages: DeepSeekMessage[], options: {
    temperature?: number;
    max_tokens?: number;
    stream?: boolean;
  } = {}): Promise<OpenRouterResponse> {
    const temperature = options.temperature || 0.7;
    const max_tokens = options.max_tokens || 2048;
    const stream = options.stream || false;
    
    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://zabbit.app', // Replace with your actual domain
        'X-Title': 'Zabbit AI Assistant'
      },
      body: JSON.stringify({
        model: this.modelPath,
        messages,
        temperature,
        max_tokens,
        stream
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter API Error: ${error.error?.message || JSON.stringify(error) || 'Unknown error'}`);
    }
    
    return await response.json();
  }
  
  async streamChat(messages: DeepSeekMessage[], options: {
    temperature?: number;
    max_tokens?: number;
    onMessage: (content: string, done: boolean) => void;
  }): Promise<void> {
    const temperature = options.temperature || 0.7;
    const max_tokens = options.max_tokens || 2048;
    
    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://zabbit.app', // Replace with your actual domain
        'X-Title': 'Zabbit AI Assistant'
      },
      body: JSON.stringify({
        model: this.modelPath,
        messages,
        temperature,
        max_tokens,
        stream: true
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter API Error: ${error.error?.message || JSON.stringify(error) || 'Unknown error'}`);
    }
    
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Failed to get response reader');
    }
    
    const decoder = new TextDecoder();
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        options.onMessage('', true);
        break;
      }
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            options.onMessage('', true);
            break;
          }
          
          try {
            const json = JSON.parse(data);
            const content = json.choices[0]?.delta?.content || '';
            options.onMessage(content, false);
          } catch (error) {
            console.error('Error parsing SSE message:', error);
          }
        }
      }
    }
  }
}

// Create a singleton instance of the DeepSeek client
let deepseekClient: DeepSeekClient | null = null;

export function getDeepSeekClient(): DeepSeekClient {
  if (!deepseekClient) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPSEEK_API_KEY environment variable is not set');
    }
    
    // Using OpenRouter endpoint for DeepSeek
    const modelPath = process.env.DEEPSEEK_MODEL_PATH || 'deepseek/deepseek-chat-v3-0324:free';
    deepseekClient = new DeepSeekClient(apiKey, modelPath);
  }
  
  return deepseekClient;
}
