/**
 * Zabbix MCP Schema
 * 
 * This module defines the schema for the Zabbix MCP, following the Model Context Protocol specification.
 * It describes the available actions, their parameters, and return types.
 */

export const ZabbixMCPSchema = {
  name: 'zabbix',
  description: 'Zabbix monitoring system API integration',
  version: '1.0.0',
  actions: {
    getHosts: {
      description: 'Get hosts from Zabbix',
      parameters: {
        filter: {
          type: 'object',
          description: 'Filter criteria for hosts',
          properties: {
            host: { type: 'array', items: { type: 'string' }, description: 'Host names to filter by' },
            status: { type: 'array', items: { type: 'string' }, description: 'Host statuses to filter by' },
            groupids: { type: 'array', items: { type: 'string' }, description: 'Host group IDs to filter by' }
          },
          required: []
        },
        output: {
          type: 'string',
          description: 'Output fields to return',
          default: 'extend'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 50
        }
      },
      returns: {
        type: 'array',
        description: 'List of hosts',
        items: {
          type: 'object',
          properties: {
            hostid: { type: 'string', description: 'Host ID' },
            host: { type: 'string', description: 'Host name' },
            name: { type: 'string', description: 'Visible host name' },
            status: { type: 'string', description: 'Host status' },
            interfaces: { type: 'array', description: 'Host interfaces' }
          }
        }
      }
    },
    
    getItems: {
      description: 'Get monitoring items from Zabbix',
      parameters: {
        hostids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Host IDs to get items for'
        },
        itemids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Item IDs to get'
        },
        output: {
          type: 'string',
          description: 'Output fields to return',
          default: 'extend'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 100
        }
      },
      returns: {
        type: 'array',
        description: 'List of items',
        items: {
          type: 'object',
          properties: {
            itemid: { type: 'string', description: 'Item ID' },
            name: { type: 'string', description: 'Item name' },
            key_: { type: 'string', description: 'Item key' },
            hostid: { type: 'string', description: 'Host ID' },
            value_type: { type: 'string', description: 'Type of information' },
            lastvalue: { type: 'string', description: 'Last value' },
            lastclock: { type: 'string', description: 'Timestamp of last value' }
          }
        }
      }
    },
    
    getProblems: {
      description: 'Get problems from Zabbix',
      parameters: {
        hostids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Host IDs to get problems for'
        },
        time_from: {
          type: 'integer',
          description: 'Time from which to get problems (Unix timestamp)'
        },
        time_till: {
          type: 'integer',
          description: 'Time until which to get problems (Unix timestamp)'
        },
        severities: {
          type: 'array',
          items: { type: 'integer' },
          description: 'Problem severities to get (0-5)'
        },
        recent: {
          type: 'boolean',
          description: 'Get only recent problems',
          default: true
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 50
        }
      },
      returns: {
        type: 'array',
        description: 'List of problems',
        items: {
          type: 'object',
          properties: {
            eventid: { type: 'string', description: 'Event ID' },
            objectid: { type: 'string', description: 'Object ID (triggerid)' },
            name: { type: 'string', description: 'Problem name' },
            severity: { type: 'string', description: 'Problem severity' },
            clock: { type: 'string', description: 'Time when problem occurred' },
            r_clock: { type: 'string', description: 'Time when problem was resolved' },
            hosts: { type: 'array', description: 'Affected hosts' }
          }
        }
      }
    },
    
    getHistory: {
      description: 'Get history data from Zabbix',
      parameters: {
        itemids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Item IDs to get history for',
          required: true
        },
        history: {
          type: 'integer',
          description: 'History type (0-4)',
          default: 0
        },
        time_from: {
          type: 'integer',
          description: 'Start time (Unix timestamp)'
        },
        time_till: {
          type: 'integer',
          description: 'End time (Unix timestamp)'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 100
        }
      },
      returns: {
        type: 'array',
        description: 'History data',
        items: {
          type: 'object',
          properties: {
            itemid: { type: 'string', description: 'Item ID' },
            clock: { type: 'string', description: 'Timestamp' },
            value: { type: 'string', description: 'Value' },
            ns: { type: 'string', description: 'Nanoseconds' }
          }
        }
      }
    },
    
    getTriggers: {
      description: 'Get triggers from Zabbix',
      parameters: {
        triggerids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Trigger IDs to get'
        },
        hostids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Host IDs to get triggers for'
        },
        only_true: {
          type: 'boolean',
          description: 'Return only triggers that have recently been in problem state',
          default: false
        },
        min_severity: {
          type: 'integer',
          description: 'Minimum trigger severity (0-5)',
          default: 0
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 50
        }
      },
      returns: {
        type: 'array',
        description: 'List of triggers',
        items: {
          type: 'object',
          properties: {
            triggerid: { type: 'string', description: 'Trigger ID' },
            description: { type: 'string', description: 'Trigger description' },
            priority: { type: 'string', description: 'Trigger severity' },
            status: { type: 'string', description: 'Trigger status' },
            value: { type: 'string', description: 'Trigger value (0: OK, 1: Problem)' },
            lastchange: { type: 'string', description: 'Time of last status change' },
            hosts: { type: 'array', description: 'Hosts the trigger belongs to' }
          }
        }
      }
    },
    
    getEvents: {
      description: 'Get events from Zabbix',
      parameters: {
        eventids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Event IDs to get'
        },
        hostids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Host IDs to get events for'
        },
        time_from: {
          type: 'integer',
          description: 'Start time (Unix timestamp)'
        },
        time_till: {
          type: 'integer',
          description: 'End time (Unix timestamp)'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 50
        }
      },
      returns: {
        type: 'array',
        description: 'List of events',
        items: {
          type: 'object',
          properties: {
            eventid: { type: 'string', description: 'Event ID' },
            source: { type: 'string', description: 'Event source' },
            object: { type: 'string', description: 'Event object type' },
            objectid: { type: 'string', description: 'Object ID' },
            clock: { type: 'string', description: 'Event creation time' },
            value: { type: 'string', description: 'Event value' },
            hosts: { type: 'array', description: 'Affected hosts' }
          }
        }
      }
    },
    
    getAlerts: {
      description: 'Get alerts from Zabbix',
      parameters: {
        alertids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Alert IDs to get'
        },
        eventids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Event IDs to get alerts for'
        },
        time_from: {
          type: 'integer',
          description: 'Start time (Unix timestamp)'
        },
        time_till: {
          type: 'integer',
          description: 'End time (Unix timestamp)'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 50
        }
      },
      returns: {
        type: 'array',
        description: 'List of alerts',
        items: {
          type: 'object',
          properties: {
            alertid: { type: 'string', description: 'Alert ID' },
            eventid: { type: 'string', description: 'Event ID' },
            clock: { type: 'string', description: 'Alert time' },
            message: { type: 'string', description: 'Alert message' },
            sendto: { type: 'string', description: 'Recipient' },
            status: { type: 'string', description: 'Alert status' }
          }
        }
      }
    },
    
    getDashboards: {
      description: 'Get dashboards from Zabbix',
      parameters: {
        dashboardids: {
          type: 'array',
          items: { type: 'string' },
          description: 'Dashboard IDs to get'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of records to return',
          default: 20
        }
      },
      returns: {
        type: 'array',
        description: 'List of dashboards',
        items: {
          type: 'object',
          properties: {
            dashboardid: { type: 'string', description: 'Dashboard ID' },
            name: { type: 'string', description: 'Dashboard name' },
            userid: { type: 'string', description: 'Dashboard owner user ID' },
            private: { type: 'string', description: 'Dashboard type (0: public, 1: private)' },
            pages: { type: 'array', description: 'Dashboard pages' }
          }
        }
      }
    },
    
    executeAction: {
      description: 'Execute a custom Zabbix API method',
      parameters: {
        method: {
          type: 'string',
          description: 'Zabbix API method to execute',
          required: true
        },
        parameters: {
          type: 'object',
          description: 'Parameters for the API method',
          default: {}
        }
      },
      returns: {
        type: 'any',
        description: 'Result of the API method execution'
      }
    }
  }
};
