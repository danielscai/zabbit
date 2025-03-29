import { useState } from 'react';

interface AlertItem {
    id: string;
    source: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    message: string;
    timestamp: string;
    status: 'active' | 'acknowledged' | 'resolved';
    service: string;
}

export default function AlertSummaryTab() {
    // Sample alerts data from multiple Java applications
    const [alerts, setAlerts] = useState<AlertItem[]>([
        {
            id: '1',
            source: 'Order Service',
            severity: 'critical',
            message: 'Database connection timeout',
            timestamp: '2025-03-29 17:45:23',
            status: 'active',
            service: 'Java Spring Boot',
        },
        {
            id: '2',
            source: 'Payment Gateway',
            severity: 'high',
            message: 'High memory usage (95%)',
            timestamp: '2025-03-29 17:30:12',
            status: 'acknowledged',
            service: 'Java Microservice',
        },
        {
            id: '3',
            source: 'User Authentication',
            severity: 'medium',
            message: 'Increased login failures',
            timestamp: '2025-03-29 16:55:47',
            status: 'active',
            service: 'Java Spring Security',
        },
        {
            id: '4',
            source: 'Inventory Service',
            severity: 'high',
            message: 'API response time > 2s',
            timestamp: '2025-03-29 16:22:31',
            status: 'active',
            service: 'Java Quarkus',
        },
        {
            id: '5',
            source: 'Notification Service',
            severity: 'low',
            message: 'Queue backlog increasing',
            timestamp: '2025-03-29 15:48:19',
            status: 'resolved',
            service: 'Java Kafka Consumer',
        },
    ]);

    // Filter states
    const [severityFilter, setSeverityFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sourceFilter, setSourceFilter] = useState<string>('all');

    // Filter alerts based on selected filters
    const filteredAlerts = alerts.filter((alert) => {
        const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
        const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
        const matchesSource = sourceFilter === 'all' || alert.source === sourceFilter;
        return matchesSeverity && matchesStatus && matchesSource;
    });

    // Get unique sources for filter dropdown
    const sources = Array.from(new Set(alerts.map((alert) => alert.source)));

    // Handle alert actions
    const handleAcknowledge = (alertId: string) => {
        setAlerts(
            alerts.map((alert) =>
                alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert,
            ),
        );
    };

    const handleResolve = (alertId: string) => {
        setAlerts(
            alerts.map((alert) =>
                alert.id === alertId ? { ...alert, status: 'resolved' } : alert,
            ),
        );
    };

    const getSeverityClass = (severity: string) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'high':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'low':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'acknowledged':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'resolved':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    return (
        <div className="mt-6" data-oid="alert-summary-container">
            {/* Introduction Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="intro-container"
            >
                <div className="px-6 py-4" data-oid="intro-content">
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white mb-2"
                        data-oid="intro-title"
                    >
                        告警汇总
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300" data-oid="intro-description">
                        此页面汇总了来自多个 Zabbix
                        应用服务的告警信息，提供统一的视图和管理界面。您可以查看、确认和解决各种告警，并通过过滤器快速定位关注的告警。
                    </p>
                </div>
            </div>

            {/* Filters Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="filters-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="filters-header"
                >
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="filters-title"
                    >
                        过滤选项
                    </h3>
                </div>
                <div className="px-6 py-4" data-oid="filters-content">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="filters-grid">
                        <div data-oid="severity-filter">
                            <label
                                htmlFor="severity-filter"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                data-oid="h:8sdvl"
                            >
                                严重程度
                            </label>
                            <select
                                id="severity-filter"
                                value={severityFilter}
                                onChange={(e) => setSeverityFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                data-oid="liux1m4"
                            >
                                <option value="all" data-oid="ar27brj">
                                    全部
                                </option>
                                <option value="critical" data-oid="5k259za">
                                    严重
                                </option>
                                <option value="high" data-oid="8_62y0g">
                                    高
                                </option>
                                <option value="medium" data-oid="3mpqpt.">
                                    中
                                </option>
                                <option value="low" data-oid="_m.u7n8">
                                    低
                                </option>
                            </select>
                        </div>
                        <div data-oid="status-filter">
                            <label
                                htmlFor="status-filter"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                data-oid=":lm1gdo"
                            >
                                状态
                            </label>
                            <select
                                id="status-filter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                data-oid="b1sxxep"
                            >
                                <option value="all" data-oid="d41k8pf">
                                    全部
                                </option>
                                <option value="active" data-oid="xr:f_g2">
                                    活跃
                                </option>
                                <option value="acknowledged" data-oid=".2lyd3z">
                                    已确认
                                </option>
                                <option value="resolved" data-oid="w32xmr.">
                                    已解决
                                </option>
                            </select>
                        </div>
                        <div data-oid="source-filter">
                            <label
                                htmlFor="source-filter"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                data-oid="r23m2r."
                            >
                                来源服务
                            </label>
                            <select
                                id="source-filter"
                                value={sourceFilter}
                                onChange={(e) => setSourceFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                data-oid="mqd8c31"
                            >
                                <option value="all" data-oid=".oqd67b">
                                    全部
                                </option>
                                {sources.map((source) => (
                                    <option key={source} value={source} data-oid="v9abldk">
                                        {source}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alerts Table */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="alerts-table-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="table-header"
                >
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="table-title"
                    >
                        告警列表
                    </h3>
                </div>
                <div className="overflow-x-auto" data-oid="table-content">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="alerts-table"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="k:pazcm">
                            <tr data-oid="8cmxola">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="e:b0vr9"
                                >
                                    来源
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid=":bwbjif"
                                >
                                    严重程度
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="un64z28"
                                >
                                    消息
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="ccy_scc"
                                >
                                    时间
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="4dq2_3x"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="snai8an"
                                >
                                    服务类型
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="4q-:iun"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="zpcqqxq"
                        >
                            {filteredAlerts.length > 0 ? (
                                filteredAlerts.map((alert) => (
                                    <tr key={alert.id} data-oid="eymyn4n">
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                            data-oid="htdmonj"
                                        >
                                            {alert.source}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="d15hbqs"
                                        >
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityClass(alert.severity)}`}
                                                data-oid="2yi0azu"
                                            >
                                                {alert.severity === 'critical'
                                                    ? '严重'
                                                    : alert.severity === 'high'
                                                      ? '高'
                                                      : alert.severity === 'medium'
                                                        ? '中'
                                                        : '低'}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-md truncate"
                                            data-oid="oomj3dl"
                                        >
                                            {alert.message}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid="76z82pj"
                                        >
                                            {alert.timestamp}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="3nhfg2h"
                                        >
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(alert.status)}`}
                                                data-oid="loi2s9r"
                                            >
                                                {alert.status === 'active'
                                                    ? '活跃'
                                                    : alert.status === 'acknowledged'
                                                      ? '已确认'
                                                      : '已解决'}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid="5bmzhst"
                                        >
                                            {alert.service}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                            data-oid="jkzx66f"
                                        >
                                            {alert.status === 'active' && (
                                                <button
                                                    onClick={() => handleAcknowledge(alert.id)}
                                                    className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                                                    data-oid="5txpjsv"
                                                >
                                                    确认
                                                </button>
                                            )}
                                            {(alert.status === 'active' ||
                                                alert.status === 'acknowledged') && (
                                                <button
                                                    onClick={() => handleResolve(alert.id)}
                                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                    data-oid="mtf_agd"
                                                >
                                                    解决
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr data-oid="n5ti9ml">
                                    <td
                                        colSpan={7}
                                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="frabtze"
                                    >
                                        没有找到匹配的告警
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
