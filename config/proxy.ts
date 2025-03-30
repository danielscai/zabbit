export interface ProxyConfig {
    httpProxy: string;
    httpsProxy: string;
    allProxy: string;
}

export const defaultProxyConfig: ProxyConfig = {
    httpProxy: 'http://127.0.0.1:7890',
    httpsProxy: 'http://127.0.0.1:7890',
    allProxy: 'socks5://127.0.0.1:7890'
}; 