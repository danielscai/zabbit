import { useState } from 'react';

interface InspectionTemplate {
    id: string;
    name: string;
    createdAt: string;
    lastModified: string;
}

interface InspectionReport {
    id: string;
    templateName: string;
    createdAt: string;
    status: 'completed' | 'in-progress' | 'failed';
    size: string;
}

export default function ZabbixInspectionTab() {
    const [autoInspectionEnabled, setAutoInspectionEnabled] = useState(false);
    const [scheduleFrequency, setScheduleFrequency] = useState('weekly');

    // Sample templates data
    const [templates, setTemplates] = useState<InspectionTemplate[]>([
        {
            id: '1',
            name: 'Zabbix平台全面巡检模板',
            createdAt: '2025-03-15',
            lastModified: '2025-03-20',
        },
        {
            id: '2',
            name: '性能巡检专项模板',
            createdAt: '2025-03-10',
            lastModified: '2025-03-18',
        },
    ]);

    // Sample reports data
    const [reports, setReports] = useState<InspectionReport[]>([
        {
            id: '1',
            templateName: 'Zabbix平台全面巡检模板',
            createdAt: '2025-03-28 09:00:00',
            status: 'completed',
            size: '2.4 MB',
        },
        {
            id: '2',
            templateName: '性能巡检专项模板',
            createdAt: '2025-03-25 14:30:00',
            status: 'completed',
            size: '1.8 MB',
        },
        {
            id: '3',
            templateName: 'Zabbix平台全面巡检模板',
            createdAt: '2025-03-22 10:15:00',
            status: 'failed',
            size: '0 KB',
        },
    ]);

    // Function to handle report actions
    const handleViewReport = (reportId: string) => {
        console.log(`Viewing report ${reportId}`);
        // Implementation would open the report for viewing
    };

    const handleDownloadReport = (reportId: string) => {
        console.log(`Downloading report ${reportId}`);
        // Implementation would download the report
    };

    const handleDeleteReport = (reportId: string) => {
        setReports(reports.filter((report) => report.id !== reportId));
    };

    // Function to handle template actions
    const handleEditTemplate = (templateId: string) => {
        console.log(`Editing template ${templateId}`);
        // Implementation would open template editor
    };

    const handleDeleteTemplate = (templateId: string) => {
        setTemplates(templates.filter((template) => template.id !== templateId));
    };

    return (
        <div className="mt-6" data-oid="zabbix-inspection-container">
            {/* Auto Inspection Settings */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="auto-inspection-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="auto-inspection-header"
                >
                    <div
                        className="flex justify-between items-center"
                        data-oid="auto-inspection-title-row"
                    >
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="auto-inspection-title"
                        >
                            自动巡检设置
                        </h3>
                        <div
                            className="flex items-center space-x-2"
                            data-oid="auto-inspection-toggle"
                        >
                            <label
                                htmlFor="auto-inspection-switch"
                                className="text-sm text-gray-700 dark:text-gray-300"
                                data-oid="auto-inspection-label"
                            >
                                定时巡检
                            </label>
                            <div
                                className="relative inline-block w-10 mr-2 align-middle select-none"
                                data-oid="toggle-container"
                            >
                                <input
                                    type="checkbox"
                                    id="auto-inspection-switch"
                                    checked={autoInspectionEnabled}
                                    onChange={() =>
                                        setAutoInspectionEnabled(!autoInspectionEnabled)
                                    }
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                    data-oid="toggle-input"
                                />

                                <label
                                    htmlFor="auto-inspection-switch"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${autoInspectionEnabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    data-oid="toggle-label"
                                ></label>
                            </div>
                        </div>
                    </div>
                </div>

                {autoInspectionEnabled && (
                    <div className="px-6 py-4" data-oid="schedule-settings">
                        <div className="flex items-center space-x-4" data-oid="schedule-container">
                            <label
                                htmlFor="schedule-frequency"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                data-oid="frequency-label"
                            >
                                巡检频率
                            </label>
                            <select
                                id="schedule-frequency"
                                value={scheduleFrequency}
                                onChange={(e) => setScheduleFrequency(e.target.value)}
                                className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                                data-oid="frequency-select"
                            >
                                <option value="daily" data-oid="daily-option">
                                    每天
                                </option>
                                <option value="weekly" data-oid="weekly-option">
                                    每周
                                </option>
                                <option value="monthly" data-oid="monthly-option">
                                    每月
                                </option>
                            </select>

                            <button
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                data-oid="save-schedule-button"
                            >
                                保存设置
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Templates Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="templates-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="templates-header"
                >
                    <div
                        className="flex justify-between items-center"
                        data-oid="templates-title-row"
                    >
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="templates-title"
                        >
                            巡检模板
                        </h3>
                        <button
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            data-oid="create-template-button"
                        >
                            创建新模板
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4" data-oid="templates-content">
                    <div className="overflow-x-auto" data-oid="templates-table-container">
                        <table
                            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                            data-oid="templates-table"
                        >
                            <thead
                                className="bg-gray-50 dark:bg-gray-700"
                                data-oid="templates-thead"
                            >
                                <tr data-oid="templates-header-row">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="template-name-header"
                                    >
                                        模板名称
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="created-at-header"
                                    >
                                        创建时间
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="last-modified-header"
                                    >
                                        最后修改
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="actions-header"
                                    >
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                                data-oid="templates-tbody"
                            >
                                {templates.map((template) => (
                                    <tr key={template.id} data-oid={`template-row-${template.id}`}>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                            data-oid={`template-name-${template.id}`}
                                        >
                                            {template.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid={`created-at-${template.id}`}
                                        >
                                            {template.createdAt}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid={`last-modified-${template.id}`}
                                        >
                                            {template.lastModified}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                            data-oid={`actions-${template.id}`}
                                        >
                                            <button
                                                onClick={() => handleEditTemplate(template.id)}
                                                className="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400 mr-4"
                                                data-oid={`edit-template-${template.id}`}
                                            >
                                                编辑
                                            </button>
                                            <button
                                                onClick={() => handleDeleteTemplate(template.id)}
                                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                                data-oid={`delete-template-${template.id}`}
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
            </div>

            {/* Reports Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="reports-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="reports-header"
                >
                    <div className="flex justify-between items-center" data-oid="reports-title-row">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="reports-title"
                        >
                            巡检报告
                        </h3>
                        <button
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            data-oid="create-report-button"
                        >
                            立即巡检
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4" data-oid="reports-content">
                    <div className="overflow-x-auto" data-oid="reports-table-container">
                        <table
                            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                            data-oid="reports-table"
                        >
                            <thead className="bg-gray-50 dark:bg-gray-700" data-oid="reports-thead">
                                <tr data-oid="reports-header-row">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="lehbfq0"
                                    >
                                        模板名称
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="gfl_:_6"
                                    >
                                        创建时间
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="status-header"
                                    >
                                        状态
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="size-header"
                                    >
                                        大小
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        data-oid="60_bkdt"
                                    >
                                        操作
                                    </th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                                data-oid="reports-tbody"
                            >
                                {reports.map((report) => (
                                    <tr key={report.id} data-oid={`report-row-${report.id}`}>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                            data-oid={`report-template-${report.id}`}
                                        >
                                            {report.templateName}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid={`report-created-at-${report.id}`}
                                        >
                                            {report.createdAt}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap"
                                            data-oid={`report-status-${report.id}`}
                                        >
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${
                                                    report.status === 'completed'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                                        : report.status === 'in-progress'
                                                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                                          : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                                }`}
                                                data-oid={`status-badge-${report.id}`}
                                            >
                                                {report.status === 'completed'
                                                    ? '已完成'
                                                    : report.status === 'in-progress'
                                                      ? '进行中'
                                                      : '失败'}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                            data-oid={`report-size-${report.id}`}
                                        >
                                            {report.size}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                            data-oid={`report-actions-${report.id}`}
                                        >
                                            <button
                                                onClick={() => handleViewReport(report.id)}
                                                className="text-purple-600 hover:text-purple-900 dark:hover:text-purple-400 mr-3"
                                                data-oid={`view-report-${report.id}`}
                                                disabled={report.status !== 'completed'}
                                            >
                                                查看
                                            </button>
                                            <button
                                                onClick={() => handleDownloadReport(report.id)}
                                                className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-3"
                                                data-oid={`download-report-${report.id}`}
                                                disabled={report.status !== 'completed'}
                                            >
                                                下载
                                            </button>
                                            <button
                                                onClick={() => handleDeleteReport(report.id)}
                                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                                data-oid={`delete-report-${report.id}`}
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
            </div>
        </div>
    );
}
