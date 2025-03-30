import ZabbixMcpClient from './components/ZabbixMcpClient';

/**
 * MCP Page
 * 
 * This page displays the Zabbix MCP client interface for testing
 * and interacting with the Zabbix API through the Model Context Protocol.
 */
export default function McpPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Zabbix Model Context Protocol</h1>
      <p className="mb-6">
        This interface allows you to interact with the Zabbix monitoring system through the Model Context Protocol (MCP).
        Use the tabs below to query different aspects of your Zabbix installation or create custom requests.
      </p>
      
      <ZabbixMcpClient />
    </div>
  );
}
