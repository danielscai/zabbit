import { useState } from 'react';

interface IntegratedSystem {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'inactive';
    alertCount: number;
    lastSync: string;
}

interface AlertItem {
    id: string;
    source: string;
    sourceSystem: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    message: string;
    timestamp: string;
    status: 'active' | 'acknowledged' | 'resolved';
}

export default function AlertCenterTab() {
    // Sample integrated systems
    const [systems, setSystems] = useState<IntegratedSystem[]>([
        {
            id: '1',
            name: 'Zabbix',
            type: '监控系统',
            status: 'active',
            alertCount: 12,
            lastSync: '2025-03-29 18:00:00',
        },
        {
            id: '2',
            name: 'Prometheus',
            type: '监控系统',
            status: 'active',
            alertCount: 8,
            lastSync: '2025-03-29 17:55:00',
        },
        {
            id: '3',
            name: 'ELK Stack',
            type: '日志系统',
            status: 'active',
            alertCount: 5,
            lastSync: '2025-03-29 17:50:00',
        },
        {
            id: '4',
            name: 'Nagios',
            type: '监控系统',
            status: 'inactive',
            alertCount: 0,
            lastSync: '2025-03-29 12:30:00',
        },
        {
            id: '5',
            name: 'Grafana',
            type: '可视化系统',
            status: 'active',
            alertCount: 3,
            lastSync: '2025-03-29 17:45:00',
        },
    ]);

    // Sample consolidated alerts from all systems
    const [consolidatedAlerts, setConsolidatedAlerts] = useState<AlertItem[]>([
        {
            id: '1',
            source: 'Database Server DB-01',
            sourceSystem: 'Zabbix',
            severity: 'critical',
            message: 'High CPU usage (95%)',
            timestamp: '2025-03-29 17:58:23',
            status: 'active',
        },
        {
            id: '2',
            source: 'API Gateway',
            sourceSystem: 'Prometheus',
            severity: 'high',
            message: 'High latency detected (>500ms)',
            timestamp: '2025-03-29 17:55:12',
            status: 'active',
        },
        {
            id: '3',
            source: 'Authentication Service',
            sourceSystem: 'ELK Stack',
            severity: 'medium',
            message: 'Multiple failed login attempts detected',
            timestamp: '2025-03-29 17:48:47',
            status: 'acknowledged',
        },
        {
            id: '4',
            source: 'Payment Service',
            sourceSystem: 'Prometheus',
            severity: 'high',
            message: 'Service unavailable',
            timestamp: '2025-03-29 17:45:31',
            status: 'active',
        },
        {
            id: '5',
            source: 'Order Processing',
            sourceSystem: 'Grafana',
            severity: 'low',
            message: 'Increased order processing time',
            timestamp: '2025-03-29 17:40:19',
            status: 'acknowledged',
        },
    ]);

    // State for new system integration form
    const [showIntegrationForm, setShowIntegrationForm] = useState(false);
    const [newSystem, setNewSystem] = useState({
        name: '',
        type: '监控系统',
        endpoint: '',
        apiKey: '',
    });

    // Filter states
    const [systemFilter, setSystemFilter] = useState<string>('all');
    const [severityFilter, setSeverityFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Filter alerts based on selected filters
    const filteredAlerts = consolidatedAlerts.filter((alert) => {
        const matchesSystem = systemFilter === 'all' || alert.sourceSystem === systemFilter;
        const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
        const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
        return matchesSystem && matchesSeverity && matchesStatus;
    });

    // Handle system actions
    const toggleSystemStatus = (systemId: string) => {
        setSystems(
            systems.map((system) =>
                system.id === systemId
                    ? { ...system, status: system.status === 'active' ? 'inactive' : 'active' }
                    : system,
            ),
        );
    };

    const handleDeleteSystem = (systemId: string) => {
        setSystems(systems.filter((system) => system.id !== systemId));
    };

    // Handle alert actions
    const handleAcknowledge = (alertId: string) => {
        setConsolidatedAlerts(
            consolidatedAlerts.map((alert) =>
                alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert,
            ),
        );
    };

    const handleResolve = (alertId: string) => {
        setConsolidatedAlerts(
            consolidatedAlerts.map((alert) =>
                alert.id === alertId ? { ...alert, status: 'resolved' } : alert,
            ),
        );
    };

    // Handle new system integration
    const handleAddSystem = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = (systems.length + 1).toString();
        setSystems([
            ...systems,
            {
                id: newId,
                name: newSystem.name,
                type: newSystem.type,
                status: 'active',
                alertCount: 0,
                lastSync: new Date().toLocaleString(),
            },
        ]);
        setNewSystem({ name: '', type: '监控系统', endpoint: '', apiKey: '' });
        setShowIntegrationForm(false);
    };

    // Utility functions for styling
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
        <div className="mt-6" data-oid="alert-center-container">
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
                        告警中心
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300" data-oid="intro-description">
                        告警中心集成了多个监控系统和日志系统的告警信息，提供统一的告警管理界面。您可以添加新的系统集成，查看和管理来自不同系统的告警。
                    </p>
                </div>
            </div>

            {/* Integrated Systems Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="systems-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="systems-header"
                >
                    <div className="flex justify-between items-center" data-oid="8reti:6">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="systems-title"
                        >
                            集成系统
                        </h3>
                        <button
                            onClick={() => setShowIntegrationForm(!showIntegrationForm)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            data-oid="add-system-button"
                        >
                            {showIntegrationForm ? '取消' : '添加系统'}
                        </button>
                    </div>
                </div>

                {showIntegrationForm && (
                    <div
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                        data-oid="integration-form"
                    >
                        <form onSubmit={handleAddSystem} data-oid="q70wf5g">
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                data-oid="uing00r"
                            >
                                <div data-oid="k8xqkn:">
                                    <label
                                        htmlFor="system-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="7basnds"
                                    >
                                        系统名称
                                    </label>
                                    <input
                                        type="text"
                                        id="system-name"
                                        value={newSystem.name}
                                        onChange={(e) =>
                                            setNewSystem({ ...newSystem, name: e.target.value })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="pk1nlvw"
                                    />
                                </div>
                                <div data-oid="2ube-uc">
                                    <label
                                        htmlFor="system-type"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid=":8cj7er"
                                    >
                                        系统类型
                                    </label>
                                    <select
                                        id="system-type"
                                        value={newSystem.type}
                                        onChange={(e) =>
                                            setNewSystem({ ...newSystem, type: e.target.value })
                                        }
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="lyfn2a."
                                    >
                                        <option value="监控系统" data-oid="ze-czo5">
                                            监控系统
                                        </option>
                                        <option value="日志系统" data-oid="4i3girb">
                                            日志系统
                                        </option>
                                        <option value="可视化系统" data-oid="cqaoytd">
                                            可视化系统
                                        </option>
                                        <option value="APM系统" data-oid="wfy3e61">
                                            APM系统
                                        </option>
                                        <option value="其他" data-oid="1yd_5lz">
                                            其他
                                        </option>
                                    </select>
                                </div>
                                <div data-oid="5hozyr.">
                                    <label
                                        htmlFor="system-endpoint"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="b9m:whr"
                                    >
                                        API端点
                                    </label>
                                    <input
                                        type="text"
                                        id="system-endpoint"
                                        value={newSystem.endpoint}
                                        onChange={(e) =>
                                            setNewSystem({ ...newSystem, endpoint: e.target.value })
                                        }
                                        required
                                        placeholder="https://api.example.com/alerts"
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="knj3:ew"
                                    />
                                </div>
                                <div data-oid="9hhusm9">
                                    <label
                                        htmlFor="system-apikey"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="o7e9gp."
                                    >
                                        API密钥
                                    </label>
                                    <input
                                        type="password"
                                        id="system-apikey"
                                        value={newSystem.apiKey}
                                        onChange={(e) =>
                                            setNewSystem({ ...newSystem, apiKey: e.target.value })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="w9lfu:i"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end" data-oid="2de1_dl">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    data-oid="7w7hqcb"
                                >
                                    保存
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="overflow-x-auto" data-oid="systems-table">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="e99w:yu"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="hccmxeb">
                            <tr data-oid="p5pwiz.">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="c0m15a4"
                                >
                                    系统名称
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="ts0slk3"
                                >
                                    类型
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="1onsdf6"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="j9d2hoh"
                                >
                                    告警数量
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="ntkp12."
                                >
                                    最后同步
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="8vy1ldg"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="fi:o3ru"
                        >
                            {systems.map((system) => (
                                <tr key={system.id} data-oid="ao.zv1z">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                        data-oid="s-vno1l"
                                    >
                                        {system.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="b_v8mso"
                                    >
                                        {system.type}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm"
                                        data-oid=".p.6dd6"
                                    >
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${system.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                                            data-oid="v7f7oay"
                                        >
                                            {system.status === 'active' ? '活跃' : '未活跃'}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid=":tv20kw"
                                    >
                                        {system.alertCount}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="r7n93-f"
                                    >
                                        {system.lastSync}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                        data-oid="vp8e798"
                                    >
                                        <button
                                            onClick={() => toggleSystemStatus(system.id)}
                                            className={`${system.status === 'active' ? 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300' : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'} mr-3`}
                                            data-oid="dxgck6o"
                                        >
                                            {system.status === 'active' ? '停用' : '启用'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSystem(system.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            data-oid="djzer-_"
                                        >
                                            删除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Consolidated Alerts Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="alerts-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="alerts-header"
                >
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="alerts-title"
                    >
                        统一告警管理
                    </h3>
                </div>

                {/* Filters */}
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="alerts-filters"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="6j.2pif">
                        <div data-oid="dx_kb2q">
                            <label
                                htmlFor="system-filter"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                data-oid="5l_sjji"
                            >
                                来源系统
                            </label>
                            <select
                                id="system-filter"
                                value={systemFilter}
                                onChange={(e) => setSystemFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                data-oid="tpt3h0f"
                            >
                                <option value="all" data-oid="6xtbdg9">
                                    全部
                                </option>
                                {systems
                                    .filter((s) => s.status === 'active')
                                    .map((system) => (
                                        <option
                                            key={system.id}
                                            value={system.name}
                                            data-oid="9cggulw"
                                        >
                                            {system.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div data-oid="u_y678n">
                            <label
                                htmlFor="severity-filter"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                data-oid="jzs2ce6"
                            >
                                严重程度
                            </label>
                            <select
                                id="severity-filter"
                                value={severityFilter}
                                onChange={(e) => setSeverityFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                data-oid="j5ybe3v"
                            >
                                <option value="all" data-oid="lsi0vyr">
                                    全部
                                </option>
                                <option value="critical" data-oid="3on69-h">
                                    严重
                                </option>
                                <option value="high" data-oid="phsua-a">
                                    高
                                </option>
                                <option value="medium" data-oid="x6acfj4">
                                    中
                                </option>
                                <option value="low" data-oid="wg6xxyw">
                                    低
                                </option>
                            </select>
                        </div>
                        <div data-oid="_07dhnl">
                            <label
                                htmlFor="status-filter"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                data-oid="_m:bmp_"
                            >
                                状态
                            </label>
                            <select
                                id="status-filter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                data-oid="1cdmuv9"
                            >
                                <option value="all" data-oid="m_la9p:">
                                    全部
                                </option>
                                <option value="active" data-oid="kktdl5g">
                                    活跃
                                </option>
                                <option value="acknowledged" data-oid="q6s5cny">
                                    已确认
                                </option>
                                <option value="resolved" data-oid="3zen9ij">
                                    已解决
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Alerts Table */}
                <div className="overflow-x-auto" data-oid="consolidated-alerts-table">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="h-93ho1"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="2lbxqw_">
                            <tr data-oid="q7tnkm8">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="qsn8:7n"
                                >
                                    来源
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="gpms_o1"
                                >
                                    系统
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="gi0rli9"
                                >
                                    严重程度
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="if_r2:p"
                                >
                                    消息
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="w:-v2vj"
                                >
                                    时间
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="-iqsrqy"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="ytr1if1"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="63o074c"
                        >
                            {filteredAlerts.length > 0 ? (
                                filteredAlerts.map((alert) => (
                                    <tr key={alert.id} data-oid=".60-g9-">
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                            data-oid="dx9j9q4"
                                        >
                                            {alert.source}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid="7p7ib26"
                                        >
                                            {alert.sourceSystem}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="lzaq0df"
                                        >
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityClass(alert.severity)}`}
                                                data-oid="sq.xvhp"
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
                                            data-oid="c26m765"
                                        >
                                            {alert.message}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid="9h01gff"
                                        >
                                            {alert.timestamp}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="gam6smk"
                                        >
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(alert.status)}`}
                                                data-oid="i8za35_"
                                            >
                                                {alert.status === 'active'
                                                    ? '活跃'
                                                    : alert.status === 'acknowledged'
                                                      ? '已确认'
                                                      : '已解决'}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                            data-oid="p.3dvsf"
                                        >
                                            {alert.status === 'active' && (
                                                <button
                                                    onClick={() => handleAcknowledge(alert.id)}
                                                    className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 mr-3"
                                                    data-oid="68o:afm"
                                                >
                                                    确认
                                                </button>
                                            )}
                                            {(alert.status === 'active' ||
                                                alert.status === 'acknowledged') && (
                                                <button
                                                    onClick={() => handleResolve(alert.id)}
                                                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                    data-oid="hzdu9t1"
                                                >
                                                    解决
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr data-oid="ghb:wft">
                                    <td
                                        colSpan={7}
                                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="qv6bagr"
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
