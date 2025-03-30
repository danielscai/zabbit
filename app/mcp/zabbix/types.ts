/**
 * Zabbix MCP Types
 * 
 * This module defines TypeScript types for the Zabbix MCP implementation.
 */

/**
 * Zabbix API client configuration
 */
export interface ZabbixClientConfig {
  url: string;
  user: string;
  password: string;
}

/**
 * Zabbix API response format
 */
export interface ZabbixApiResponse {
  jsonrpc: string;
  result?: any;
  error?: {
    code: number;
    message: string;
    data: string;
  };
  id: number;
}

/**
 * Zabbix MCP Context
 */
export interface ZabbixContext {
  client: ZabbixClient;
}

/**
 * Zabbix Client interface
 */
export interface ZabbixClient {
  login(): Promise<void>;
  logout(): Promise<void>;
  getHosts(params?: any): Promise<any>;
  getItems(params?: any): Promise<any>;
  getProblems(params?: any): Promise<any>;
  getHistory(params?: any): Promise<any>;
  getTriggers(params?: any): Promise<any>;
  getEvents(params?: any): Promise<any>;
  getAlerts(params?: any): Promise<any>;
  getDashboards(params?: any): Promise<any>;
  executeAction(params: any): Promise<any>;
}

/**
 * Host interface
 */
export interface ZabbixHost {
  hostid: string;
  host: string;
  name: string;
  status: string;
  interfaces: ZabbixInterface[];
  [key: string]: any;
}

/**
 * Host interface
 */
export interface ZabbixInterface {
  interfaceid: string;
  hostid: string;
  type: string;
  main: string;
  useip: string;
  ip: string;
  dns: string;
  port: string;
  [key: string]: any;
}

/**
 * Item interface
 */
export interface ZabbixItem {
  itemid: string;
  name: string;
  key_: string;
  hostid: string;
  value_type: string;
  lastvalue: string;
  lastclock: string;
  [key: string]: any;
}

/**
 * Problem interface
 */
export interface ZabbixProblem {
  eventid: string;
  objectid: string;
  name: string;
  severity: string;
  clock: string;
  r_clock: string;
  hosts: ZabbixHost[];
  [key: string]: any;
}

/**
 * History interface
 */
export interface ZabbixHistory {
  itemid: string;
  clock: string;
  value: string;
  ns: string;
  [key: string]: any;
}

/**
 * Trigger interface
 */
export interface ZabbixTrigger {
  triggerid: string;
  description: string;
  priority: string;
  status: string;
  value: string;
  lastchange: string;
  hosts: ZabbixHost[];
  [key: string]: any;
}

/**
 * Event interface
 */
export interface ZabbixEvent {
  eventid: string;
  source: string;
  object: string;
  objectid: string;
  clock: string;
  value: string;
  hosts: ZabbixHost[];
  [key: string]: any;
}

/**
 * Alert interface
 */
export interface ZabbixAlert {
  alertid: string;
  eventid: string;
  clock: string;
  message: string;
  sendto: string;
  status: string;
  [key: string]: any;
}

/**
 * Dashboard interface
 */
export interface ZabbixDashboard {
  dashboardid: string;
  name: string;
  userid: string;
  private: string;
  pages: any[];
  [key: string]: any;
}
