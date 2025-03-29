import { useState } from 'react';

interface RootCauseAnalysis {
    id: string;
    alertId: string;
    alertSource: string;
    alertMessage: string;
    timestamp: string;
    status: 'analyzing' | 'completed' | 'failed';
    rootCause: string | null;
    recommendations: string[] | null;
    confidence: number | null;
}

export default function AlertRootCauseTab() {
    // Sample root cause analyses
    const [rootCauseAnalyses, setRootCauseAnalyses] = useState<RootCauseAnalysis[]>([
        {
            id: '1',
            alertId: 'ALT-2025-001',
            alertSource: 'Zabbix',
            alertMessage: 'High CPU usage on database server DB-01',
            timestamp: '2025-03-29 17:45:23',
            status: 'completed',
            rootCause: '数据库查询优化不足导致的CPU使用率过高',
            recommendations: [
                '优化数据库查询，添加适当的索引',
                '检查是否有长时间运行的事务',
                '考虑增加数据库服务器资源',
            ],

            confidence: 0.92,
        },
        {
            id: '2',
            alertId: 'ALT-2025-002',
            alertSource: 'Prometheus',
            alertMessage: 'API Gateway high latency (>500ms)',
            timestamp: '2025-03-29 17:30:12',
            status: 'completed',
            rootCause: 'API网关连接池配置不当，导致连接耗尽',
            recommendations: ['增加连接池大小', '优化连接池配置', '检查下游服务响应时间'],

            confidence: 0.85,
        },
        {
            id: '3',
            alertId: 'ALT-2025-003',
            alertSource: 'ELK Stack',
            alertMessage: 'Multiple failed login attempts detected',
            timestamp: '2025-03-29 16:55:47',
            status: 'analyzing',
            rootCause: null,
            recommendations: null,
            confidence: null,
        },
        {
            id: '4',
            alertId: 'ALT-2025-004',
            alertSource: 'Prometheus',
            alertMessage: 'Payment Service unavailable',
            timestamp: '2025-03-29 16:22:31',
            status: 'completed',
            rootCause: '支付服务依赖的第三方API服务中断',
            recommendations: ['实施断路器模式', '添加备用支付通道', '改进错误处理机制'],

            confidence: 0.95,
        },
        {
            id: '5',
            alertId: 'ALT-2025-005',
            alertSource: 'Grafana',
            alertMessage: 'Increased order processing time',
            timestamp: '2025-03-29 15:48:19',
            status: 'failed',
            rootCause: null,
            recommendations: null,
            confidence: null,
        },
    ]);

    // AI model settings
    const [aiModelSettings, setAiModelSettings] = useState({
        model: 'gpt-4',
        confidenceThreshold: 0.7,
        maxAnalysisTime: 120, // seconds
        includeMetrics: true,
        includeLogs: true,
        includeTraces: true,
    });

    // State for new analysis form
    const [showAnalysisForm, setShowAnalysisForm] = useState(false);
    const [newAnalysis, setNewAnalysis] = useState({
        alertId: '',
        alertSource: '',
        alertMessage: '',
    });

    // Handle form submission
    const handleStartAnalysis = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = (rootCauseAnalyses.length + 1).toString();
        setRootCauseAnalyses([
            ...rootCauseAnalyses,
            {
                id: newId,
                alertId: newAnalysis.alertId,
                alertSource: newAnalysis.alertSource,
                alertMessage: newAnalysis.alertMessage,
                timestamp: new Date().toLocaleString(),
                status: 'analyzing',
                rootCause: null,
                recommendations: null,
                confidence: null,
            },
        ]);
        setNewAnalysis({ alertId: '', alertSource: '', alertMessage: '' });
        setShowAnalysisForm(false);
    };

    // Handle AI settings update
    const handleAiSettingsUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would save the AI settings to the server
        alert('AI设置已更新');
    };

    // Handle retry analysis
    const handleRetryAnalysis = (analysisId: string) => {
        setRootCauseAnalyses(
            rootCauseAnalyses.map((analysis) =>
                analysis.id === analysisId ? { ...analysis, status: 'analyzing' } : analysis,
            ),
        );
    };

    // Handle delete analysis
    const handleDeleteAnalysis = (analysisId: string) => {
        setRootCauseAnalyses(rootCauseAnalyses.filter((analysis) => analysis.id !== analysisId));
    };

    // Get status class for styling
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'analyzing':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    return (
        <div className="mt-6" data-oid="alert-root-cause-container">
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
                        告警归因分析
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300" data-oid="intro-description">
                        告警归因分析模块使用AI技术自动分析告警的根本原因，提供解决建议，帮助您更快地解决问题。系统会分析相关的指标、日志和追踪数据，找出问题的根源，并给出置信度评分。
                    </p>
                </div>
            </div>

            {/* AI Model Settings */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="ai-settings-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="ai-settings-header"
                >
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="ai-settings-title"
                    >
                        AI模型设置
                    </h3>
                </div>
                <div className="px-6 py-4" data-oid="ai-settings-form">
                    <form onSubmit={handleAiSettingsUpdate} data-oid="gmip:xn">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-oid="67__d9h">
                            <div data-oid=".rj4sv6">
                                <label
                                    htmlFor="ai-model"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    data-oid="x-nan03"
                                >
                                    AI模型
                                </label>
                                <select
                                    id="ai-model"
                                    value={aiModelSettings.model}
                                    onChange={(e) =>
                                        setAiModelSettings({
                                            ...aiModelSettings,
                                            model: e.target.value,
                                        })
                                    }
                                    className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                    data-oid="f:z_u:a"
                                >
                                    <option value="gpt-4" data-oid="s2kzmom">
                                        GPT-4
                                    </option>
                                    <option value="gpt-3.5-turbo" data-oid="hd6jslx">
                                        GPT-3.5 Turbo
                                    </option>
                                    <option value="claude-2" data-oid="0w0yemi">
                                        Claude 2
                                    </option>
                                    <option value="custom" data-oid="a6zeimb">
                                        自定义模型
                                    </option>
                                </select>
                            </div>
                            <div data-oid="-7eloy3">
                                <label
                                    htmlFor="confidence-threshold"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    data-oid="gbafrhx"
                                >
                                    置信度阈值
                                </label>
                                <input
                                    type="range"
                                    id="confidence-threshold"
                                    min="0.5"
                                    max="0.95"
                                    step="0.05"
                                    value={aiModelSettings.confidenceThreshold}
                                    onChange={(e) =>
                                        setAiModelSettings({
                                            ...aiModelSettings,
                                            confidenceThreshold: parseFloat(e.target.value),
                                        })
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    data-oid="j-_9:2w"
                                />

                                <div
                                    className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center"
                                    data-oid="5hmsa6_"
                                >
                                    {aiModelSettings.confidenceThreshold}
                                </div>
                            </div>
                            <div data-oid="give51c">
                                <label
                                    htmlFor="max-analysis-time"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                    data-oid="..i3gmu"
                                >
                                    最大分析时间（秒）
                                </label>
                                <input
                                    type="number"
                                    id="max-analysis-time"
                                    value={aiModelSettings.maxAnalysisTime}
                                    onChange={(e) =>
                                        setAiModelSettings({
                                            ...aiModelSettings,
                                            maxAnalysisTime: parseInt(e.target.value),
                                        })
                                    }
                                    min="30"
                                    max="300"
                                    className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                    data-oid="5pjoz7x"
                                />
                            </div>
                        </div>

                        <div
                            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
                            data-oid="b1:uup1"
                        >
                            <div className="flex items-center" data-oid="v.wu8nh">
                                <input
                                    type="checkbox"
                                    id="include-metrics"
                                    checked={aiModelSettings.includeMetrics}
                                    onChange={(e) =>
                                        setAiModelSettings({
                                            ...aiModelSettings,
                                            includeMetrics: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    data-oid="z7b1ues"
                                />

                                <label
                                    htmlFor="include-metrics"
                                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    data-oid="s.toanx"
                                >
                                    包含指标数据
                                </label>
                            </div>
                            <div className="flex items-center" data-oid="xv5j9d0">
                                <input
                                    type="checkbox"
                                    id="include-logs"
                                    checked={aiModelSettings.includeLogs}
                                    onChange={(e) =>
                                        setAiModelSettings({
                                            ...aiModelSettings,
                                            includeLogs: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    data-oid="uo6b66-"
                                />

                                <label
                                    htmlFor="include-logs"
                                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    data-oid="o06zss4"
                                >
                                    包含日志数据
                                </label>
                            </div>
                            <div className="flex items-center" data-oid="4uo6:tz">
                                <input
                                    type="checkbox"
                                    id="include-traces"
                                    checked={aiModelSettings.includeTraces}
                                    onChange={(e) =>
                                        setAiModelSettings({
                                            ...aiModelSettings,
                                            includeTraces: e.target.checked,
                                        })
                                    }
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                    data-oid="hgg-hqr"
                                />

                                <label
                                    htmlFor="include-traces"
                                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    data-oid="bm13ebe"
                                >
                                    包含追踪数据
                                </label>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end" data-oid="4g..d00">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                data-oid="qbtpvh8"
                            >
                                保存设置
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Root Cause Analyses */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="analyses-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="analyses-header"
                >
                    <div className="flex justify-between items-center" data-oid="54l52q0">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="analyses-title"
                        >
                            根因分析结果
                        </h3>
                        <button
                            onClick={() => setShowAnalysisForm(!showAnalysisForm)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            data-oid="add-analysis-button"
                        >
                            {showAnalysisForm ? '取消' : '开始新分析'}
                        </button>
                    </div>
                </div>

                {showAnalysisForm && (
                    <div
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                        data-oid="analysis-form"
                    >
                        <form onSubmit={handleStartAnalysis} data-oid="u659ayw">
                            <div
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                data-oid="d-k07kg"
                            >
                                <div data-oid="z0n7vtv">
                                    <label
                                        htmlFor="alert-id"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="1-vt1:v"
                                    >
                                        告警ID
                                    </label>
                                    <input
                                        type="text"
                                        id="alert-id"
                                        value={newAnalysis.alertId}
                                        onChange={(e) =>
                                            setNewAnalysis({
                                                ...newAnalysis,
                                                alertId: e.target.value,
                                            })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="ext0a8n"
                                    />
                                </div>
                                <div data-oid=".a.y.ne">
                                    <label
                                        htmlFor="alert-source"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="w-.:.dw"
                                    >
                                        告警来源
                                    </label>
                                    <input
                                        type="text"
                                        id="alert-source"
                                        value={newAnalysis.alertSource}
                                        onChange={(e) =>
                                            setNewAnalysis({
                                                ...newAnalysis,
                                                alertSource: e.target.value,
                                            })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="wygty8k"
                                    />
                                </div>
                                <div className="md:col-span-3" data-oid="yn8n:79">
                                    <label
                                        htmlFor="alert-message"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="a26wu_5"
                                    >
                                        告警消息
                                    </label>
                                    <textarea
                                        id="alert-message"
                                        value={newAnalysis.alertMessage}
                                        onChange={(e) =>
                                            setNewAnalysis({
                                                ...newAnalysis,
                                                alertMessage: e.target.value,
                                            })
                                        }
                                        required
                                        rows={3}
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="-5dqrgh"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end" data-oid="n0.zglz">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    data-oid="zplcd7-"
                                >
                                    开始分析
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="overflow-x-auto" data-oid="analyses-table">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="k8.vnr3"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="la:_867">
                            <tr data-oid="::yxk-j">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="vjc:7v_"
                                >
                                    告警ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="lbnf6bk"
                                >
                                    来源
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="uo.qq.0"
                                >
                                    告警消息
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="72z4b-p"
                                >
                                    时间
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="v06g0y."
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="beofwo_"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="ma72pgt"
                        >
                            {rootCauseAnalyses.map((analysis) => (
                                <tr key={analysis.id} data-oid="i1o.3r9">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                        data-oid="n5x-f4d"
                                    >
                                        {analysis.alertId}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="igim7zh"
                                    >
                                        {analysis.alertSource}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-md truncate"
                                        data-oid="3-3nj8_"
                                    >
                                        {analysis.alertMessage}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="vv-vs9h"
                                    >
                                        {analysis.timestamp}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm"
                                        data-oid="a9becug"
                                    >
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(analysis.status)}`}
                                            data-oid="ey54mwm"
                                        >
                                            {analysis.status === 'analyzing'
                                                ? '分析中'
                                                : analysis.status === 'completed'
                                                  ? '已完成'
                                                  : '失败'}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                        data-oid="jl_2.7:"
                                    >
                                        {analysis.status === 'completed' && (
                                            <button
                                                onClick={() =>
                                                    alert(`查看详细分析结果：${analysis.alertId}`)
                                                }
                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                                data-oid="0ndy7o8"
                                            >
                                                查看
                                            </button>
                                        )}
                                        {analysis.status === 'failed' && (
                                            <button
                                                onClick={() => handleRetryAnalysis(analysis.id)}
                                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3"
                                                data-oid="bhcfkon"
                                            >
                                                重试
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteAnalysis(analysis.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            data-oid="9bi-q9m"
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

            {/* Detailed Analysis Results */}
            {rootCauseAnalyses.filter((a) => a.status === 'completed').length > 0 && (
                <div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                    data-oid="detailed-results-container"
                >
                    <div
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                        data-oid="detailed-results-header"
                    >
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="detailed-results-title"
                        >
                            详细分析结果示例
                        </h3>
                    </div>
                    <div className="px-6 py-4" data-oid="detailed-results-content">
                        {rootCauseAnalyses
                            .filter((a) => a.status === 'completed')
                            .slice(0, 1)
                            .map((analysis) => (
                                <div key={analysis.id} className="space-y-4" data-oid="1c-8pj-">
                                    <div data-oid="bdg_546">
                                        <h4
                                            className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1"
                                            data-oid="i1sj6qh"
                                        >
                                            告警信息
                                        </h4>
                                        <p
                                            className="text-sm text-gray-600 dark:text-gray-400"
                                            data-oid="8l.08ee"
                                        >
                                            <span className="font-semibold" data-oid="6l:xhv2">
                                                ID:
                                            </span>{' '}
                                            {analysis.alertId}
                                            <br data-oid="_jsn6_9" />
                                            <span className="font-semibold" data-oid="-fx2l_-">
                                                来源:
                                            </span>{' '}
                                            {analysis.alertSource}
                                            <br data-oid="n1wb3f0" />
                                            <span className="font-semibold" data-oid="8-nj5rm">
                                                消息:
                                            </span>{' '}
                                            {analysis.alertMessage}
                                            <br data-oid="8j1a_sn" />
                                            <span className="font-semibold" data-oid="lbyyj-r">
                                                时间:
                                            </span>{' '}
                                            {analysis.timestamp}
                                        </p>
                                    </div>

                                    <div data-oid="nxts8qn">
                                        <h4
                                            className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1"
                                            data-oid="5rk7_:."
                                        >
                                            根本原因
                                        </h4>
                                        <div
                                            className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
                                            data-oid="ir6tnj5"
                                        >
                                            <p
                                                className="text-sm text-gray-600 dark:text-gray-400"
                                                data-oid="8q2_fdm"
                                            >
                                                {analysis.rootCause}
                                            </p>
                                        </div>
                                    </div>

                                    <div data-oid="dyb2rt2">
                                        <h4
                                            className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1"
                                            data-oid="z4vl2z:"
                                        >
                                            解决建议
                                        </h4>
                                        <ul
                                            className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1"
                                            data-oid="pp8tm:d"
                                        >
                                            {analysis.recommendations?.map(
                                                (recommendation, index) => (
                                                    <li key={index} data-oid="fd:k:gd">
                                                        {recommendation}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>

                                    <div data-oid="y.8u43z">
                                        <h4
                                            className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1"
                                            data-oid="pwu:8r:"
                                        >
                                            置信度
                                        </h4>
                                        <div
                                            className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
                                            data-oid="2y4-l7w"
                                        >
                                            <div
                                                className="bg-purple-600 h-2.5 rounded-full"
                                                style={{
                                                    width: `${(analysis.confidence || 0) * 100}%`,
                                                }}
                                                data-oid="-_o.cyu"
                                            ></div>
                                        </div>
                                        <p
                                            className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400"
                                            data-oid="3ezt0zk"
                                        >
                                            {((analysis.confidence || 0) * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
