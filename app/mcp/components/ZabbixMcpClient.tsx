'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * ZabbixMcpClient Component
 * 
 * This component provides a UI for interacting with the Zabbix MCP.
 * It establishes an SSE connection to the MCP server and allows sending
 * requests and viewing responses.
 */
export default function ZabbixMcpClient() {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [requestInput, setRequestInput] = useState('');
  const [activeTab, setActiveTab] = useState('hosts');
  const eventSourceRef = useRef<EventSource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect to the MCP server using SSE
  useEffect(() => {
    const connectToMcp = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const eventSource = new EventSource('/api/mcp/zabbix');
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('Connected to Zabbix MCP');
        setConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessages((prev) => [...prev, data]);
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        setConnected(false);
        eventSource.close();
        
        // Attempt to reconnect after a delay
        setTimeout(connectToMcp, 5000);
      };

      return () => {
        eventSource.close();
      };
    };

    connectToMcp();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  // Auto-scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a request to the MCP server
  const sendRequest = (action: string, params: any = {}) => {
    try {
      const request = {
        jsonrpc: '2.0',
        method: action,
        params: params,
        id: Date.now().toString()
      };

      // Add the request to the messages
      setMessages((prev) => [...prev, { type: 'clientRequest', data: request }]);

      // Send the request to the MCP server
      fetch('/api/mcp/zabbix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })
      .then(response => response.json())
      .then(data => {
        // Add the response to the messages
        setMessages((prev) => [...prev, { type: 'response', ...data }]);
      })
      .catch(error => {
        console.error('Error sending request:', error);
        // Add the error to the messages
        setMessages((prev) => [...prev, { 
          type: 'error', 
          id: request.id, 
          error: { message: `Error: ${error.message}` } 
        }]);
      });
    } catch (error) {
      console.error('Error preparing request:', error);
    }
  };

  // Handle predefined actions
  const handleAction = (action: string) => {
    switch (action) {
      case 'getHosts':
        sendRequest('getHosts', {});
        break;
      case 'getProblems':
        sendRequest('getProblems', { recent: true });
        break;
      case 'getTriggers':
        sendRequest('getTriggers', { only_true: true });
        break;
      case 'getEvents':
        sendRequest('getEvents', { limit: 10 });
        break;
      default:
        break;
    }
  };

  // Handle custom request submission
  const handleCustomRequest = () => {
    try {
      const request = JSON.parse(requestInput);
      sendRequest(request.action, request.params);
    } catch (error) {
      console.error('Error parsing custom request:', error);
      setMessages((prev) => [...prev, { 
        type: 'error', 
        data: { message: 'Invalid JSON format for request' } 
      }]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Zabbix MCP Client</CardTitle>
          <CardDescription>
            Status: {connected ? 'Connected' : 'Disconnected'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="hosts">Hosts</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="triggers">Triggers</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="hosts">
              <Button onClick={() => handleAction('getHosts')}>Get Hosts</Button>
            </TabsContent>
            
            <TabsContent value="problems">
              <Button onClick={() => handleAction('getProblems')}>Get Problems</Button>
            </TabsContent>
            
            <TabsContent value="triggers">
              <Button onClick={() => handleAction('getTriggers')}>Get Triggers</Button>
            </TabsContent>
            
            <TabsContent value="events">
              <Button onClick={() => handleAction('getEvents')}>Get Events</Button>
            </TabsContent>
            
            <TabsContent value="custom">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-request">Custom Request (JSON)</Label>
                  <Textarea
                    id="custom-request"
                    placeholder='{"action": "getHosts", "params": {}}'
                    value={requestInput}
                    onChange={(e) => setRequestInput(e.target.value)}
                    className="h-32"
                  />
                </div>
                <Button onClick={handleCustomRequest}>Send Request</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full border rounded-md p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(msg, null, 2)}
                </pre>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
