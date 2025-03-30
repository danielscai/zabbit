/**
 * Zabbix API Client
 * 
 * This module provides a client for interacting with the Zabbix API.
 * It handles authentication, request formatting, and response parsing.
 */

import axios from 'axios';
import type { ZabbixClientConfig, ZabbixApiResponse } from './types';

export class ZabbixClient {
  private url: string;
  private user: string;
  private password: string;
  private auth: string | null = null;
  private requestId = 1;

  constructor(config: ZabbixClientConfig) {
    this.url = config.url;
    this.user = config.user;
    this.password = config.password;
  }

  /**
   * Login to the Zabbix API and get an authentication token
   */
  async login(): Promise<void> {
    try {
      const response = await this.request('user.login', {
        username: this.user,
        password: this.password
      }, false);

      if (response && response.result) {
        this.auth = response.result;
        console.log('Successfully logged in to Zabbix API');
      } else {
        throw new Error('Failed to authenticate with Zabbix API');
      }
    } catch (error) {
      console.error('Zabbix login error:', error);
      throw error;
    }
  }

  /**
   * Logout from the Zabbix API
   */
  async logout(): Promise<void> {
    if (!this.auth) return;

    try {
      await this.request('user.logout', {});
      this.auth = null;
      console.log('Successfully logged out from Zabbix API');
    } catch (error) {
      console.error('Zabbix logout error:', error);
      throw error;
    }
  }

  /**
   * Make a request to the Zabbix API
   */
  private async request(method: string, params: any, requireAuth = true): Promise<ZabbixApiResponse> {
    const id = this.requestId++;
    const body = {
      jsonrpc: '2.0',
      method,
      params,
      id,
      auth: requireAuth ? this.auth : null
    };

    try {
      const response = await axios.post(this.url, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.error) {
        throw new Error(`Zabbix API error: ${JSON.stringify(response.data.error)}`);
      }

      return response.data;
    } catch (error) {
      console.error(`Zabbix API request error (${method}):`, error);
      throw error;
    }
  }

  /**
   * Get hosts from Zabbix
   */
  async getHosts(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectInterfaces: 'extend'
    };
    
    const response = await this.request('host.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Get items from Zabbix
   */
  async getItems(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectHosts: 'extend'
    };
    
    const response = await this.request('item.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Get problems from Zabbix
   */
  async getProblems(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectHosts: 'extend',
      selectTags: 'extend',
      recent: true,
      sortfield: ['eventid'],
      sortorder: 'DESC'
    };
    
    const response = await this.request('problem.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Get history from Zabbix
   */
  async getHistory(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      sortfield: 'clock',
      sortorder: 'DESC',
      history: 0 // 0 - numeric float; 1 - character; 2 - log; 3 - numeric unsigned; 4 - text
    };
    
    const response = await this.request('history.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Get triggers from Zabbix
   */
  async getTriggers(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectHosts: 'extend',
      selectDependencies: 'extend',
      expandDescription: true
    };
    
    const response = await this.request('trigger.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Get events from Zabbix
   */
  async getEvents(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectHosts: 'extend',
      sortfield: ['clock', 'eventid'],
      sortorder: 'DESC'
    };
    
    const response = await this.request('event.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Get alerts from Zabbix
   */
  async getAlerts(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      sortfield: ['clock'],
      sortorder: 'DESC'
    };
    
    const response = await this.request('alert.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Get dashboards from Zabbix
   */
  async getDashboards(params: any = {}): Promise<any> {
    const defaultParams = {
      output: 'extend',
      selectPages: 'extend',
      selectUsers: 'extend',
      selectUserGroups: 'extend'
    };
    
    const response = await this.request('dashboard.get', { ...defaultParams, ...params });
    return response.result;
  }

  /**
   * Execute a custom action in Zabbix
   */
  async executeAction(params: any = {}): Promise<any> {
    const { method, parameters } = params;
    
    if (!method) {
      throw new Error('Method is required for executeAction');
    }
    
    const response = await this.request(method, parameters || {});
    return response.result;
  }
}
