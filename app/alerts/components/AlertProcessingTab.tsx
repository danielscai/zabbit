import { useState } from 'react';

interface ProcessingRule {
    id: string;
    name: string;
    description: string;
    condition: string;
    action: string;
    status: 'active' | 'inactive';
    priority: number;
    aiIntegration: boolean;
}

export default function AlertProcessingTab() {
    // Sample processing rules
    const [processingRules, setProcessingRules] = useState<ProcessingRule[]>([
        {
            id: '1',
            name: '告警消息格式化',
            description: '将告警消息格式化为标准格式',
            condition: '所有告警',
            action: '应用模板: "[严重程度] 服务 {service} 发生告警: {message}"',
            status: 'active',
            priority: 1,
            aiIntegration: false,
        },
        {
            id: '2',
            name: '告警分类标记',
            description: '根据关键词自动为告警添加分类标签',
            condition: '消息包含特定关键词',
            action: '添加标签: "类型:{标签}"',
            status: 'active',
            priority: 2,
            aiIntegration: true,
        },
        {
            id: '3',
            name: '告警丰富化',
            description: '为告警添加额外上下文信息',
            condition: '服务器告警',
            action: '添加信息: 服务器IP、负载、内存使用率等',
            status: 'inactive',
            priority: 3,
            aiIntegration: false,
        },
        {
            id: '4',
            name: 'AI告警摘要生成',
            description: '使用AI生成告警摘要',
            condition: '严重程度为高或严重的告警',
            action: '调用AI生成简短摘要并添加到告警信息中',
            status: 'active',
            priority: 4,
            aiIntegration: true,
        },
    ]);

    // State for new rule form
    const [showRuleForm, setShowRuleForm] = useState(false);
    const [newRule, setNewRule] = useState({
        name: '',
        description: '',
        condition: '',
        action: '',
        priority: 1,
        aiIntegration: false,
    });

    // AI integration settings
    const [aiSettings, setAiSettings] = useState({
        enabled: true,
        model: 'gpt-4',
        apiKey: '**********',
        maxTokens: 500,
    });

    // Handle rule actions
    const toggleRuleStatus = (ruleId: string) => {
        setProcessingRules(
            processingRules.map((rule) =>
                rule.id === ruleId
                    ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
                    : rule,
            ),
        );
    };

    const handleDeleteRule = (ruleId: string) => {
        setProcessingRules(processingRules.filter((rule) => rule.id !== ruleId));
    };

    // Handle form submission
    const handleAddRule = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = (processingRules.length + 1).toString();
        setProcessingRules([
            ...processingRules,
            {
                id: newId,
                name: newRule.name,
                description: newRule.description,
                condition: newRule.condition,
                action: newRule.action,
                status: 'active',
                priority: newRule.priority,
                aiIntegration: newRule.aiIntegration,
            },
        ]);
        setNewRule({
            name: '',
            description: '',
            condition: '',
            action: '',
            priority: 1,
            aiIntegration: false,
        });
        setShowRuleForm(false);
    };

    // Handle AI settings update
    const handleAiSettingsUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real implementation, this would save the AI settings to the server
        alert('AI设置已更新');
    };

    return (
        <div className="mt-6" data-oid="alert-processing-container">
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
                        告警文本处理
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300" data-oid="intro-description">
                        告警文本处理模块允许您对接收到的告警进行二次处理，包括格式化、分类、丰富化等操作。您还可以集成AI能力，对告警进行智能处理，提高告警的可读性和有效性。
                    </p>
                </div>
            </div>

            {/* Processing Rules Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="rules-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="rules-header"
                >
                    <div className="flex justify-between items-center" data-oid="2xvvhek">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="rules-title"
                        >
                            处理规则
                        </h3>
                        <button
                            onClick={() => setShowRuleForm(!showRuleForm)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            data-oid="add-rule-button"
                        >
                            {showRuleForm ? '取消' : '添加规则'}
                        </button>
                    </div>
                </div>

                {showRuleForm && (
                    <div
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                        data-oid="rule-form"
                    >
                        <form onSubmit={handleAddRule} data-oid=".mo7soo">
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                data-oid="8ro4v1y"
                            >
                                <div data-oid="oiq:zbl">
                                    <label
                                        htmlFor="rule-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="m_814wi"
                                    >
                                        规则名称
                                    </label>
                                    <input
                                        type="text"
                                        id="rule-name"
                                        value={newRule.name}
                                        onChange={(e) =>
                                            setNewRule({ ...newRule, name: e.target.value })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="nix3xdl"
                                    />
                                </div>
                                <div data-oid=".py59_j">
                                    <label
                                        htmlFor="rule-description"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="c5.fgev"
                                    >
                                        描述
                                    </label>
                                    <input
                                        type="text"
                                        id="rule-description"
                                        value={newRule.description}
                                        onChange={(e) =>
                                            setNewRule({ ...newRule, description: e.target.value })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="h-j-gah"
                                    />
                                </div>
                                <div data-oid="560nywm">
                                    <label
                                        htmlFor="rule-condition"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid=".5yv7vt"
                                    >
                                        条件
                                    </label>
                                    <input
                                        type="text"
                                        id="rule-condition"
                                        value={newRule.condition}
                                        onChange={(e) =>
                                            setNewRule({ ...newRule, condition: e.target.value })
                                        }
                                        required
                                        placeholder="例如: 所有告警, 严重程度为高的告警"
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid=":e8ru4j"
                                    />
                                </div>
                                <div data-oid="kacg:tw">
                                    <label
                                        htmlFor="rule-action"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="ygrbzir"
                                    >
                                        动作
                                    </label>
                                    <input
                                        type="text"
                                        id="rule-action"
                                        value={newRule.action}
                                        onChange={(e) =>
                                            setNewRule({ ...newRule, action: e.target.value })
                                        }
                                        required
                                        placeholder="例如: 应用模板, 添加标签"
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="755d_6q"
                                    />
                                </div>
                                <div data-oid="a7jjmlj">
                                    <label
                                        htmlFor="rule-priority"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="j:jnvdo"
                                    >
                                        优先级
                                    </label>
                                    <input
                                        type="number"
                                        id="rule-priority"
                                        value={newRule.priority}
                                        onChange={(e) =>
                                            setNewRule({
                                                ...newRule,
                                                priority: parseInt(e.target.value),
                                            })
                                        }
                                        min="1"
                                        max="10"
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="1b0btys"
                                    />
                                </div>
                                <div className="flex items-center" data-oid="xypboio">
                                    <input
                                        type="checkbox"
                                        id="rule-ai"
                                        checked={newRule.aiIntegration}
                                        onChange={(e) =>
                                            setNewRule({
                                                ...newRule,
                                                aiIntegration: e.target.checked,
                                            })
                                        }
                                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                        data-oid="vbk9btp"
                                    />

                                    <label
                                        htmlFor="rule-ai"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                        data-oid="1sm7:mq"
                                    >
                                        使用AI处理
                                    </label>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end" data-oid="7yy0bjh">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    data-oid="q7xe6_g"
                                >
                                    保存
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="overflow-x-auto" data-oid="rules-table">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="hxmjlfn"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="ccoiyuq">
                            <tr data-oid="cwrze3j">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="20l.fn-"
                                >
                                    规则名称
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="e3asz6-"
                                >
                                    描述
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="m7uy1hr"
                                >
                                    条件
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="tlrveob"
                                >
                                    动作
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid=".bbf1-g"
                                >
                                    优先级
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="ct21jq5"
                                >
                                    AI集成
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="cruux3p"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="v12uygy"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="ul49xnq"
                        >
                            {processingRules.map((rule) => (
                                <tr key={rule.id} data-oid="dc-ra3b">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                        data-oid="8m1ic.b"
                                    >
                                        {rule.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="bewhqvp"
                                    >
                                        {rule.description}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="hmiu56d"
                                    >
                                        {rule.condition}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="b9t5-pk"
                                    >
                                        {rule.action}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="pd_dd_2"
                                    >
                                        {rule.priority}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="1h1g0gj"
                                    >
                                        {rule.aiIntegration ? (
                                            <span
                                                className="text-green-600 dark:text-green-400"
                                                data-oid="32d9f_j"
                                            >
                                                <svg
                                                    className="h-5 w-5 inline"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-oid="awhcv80"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                        data-oid="zmygs2k"
                                                    />
                                                </svg>
                                            </span>
                                        ) : (
                                            <span
                                                className="text-gray-400 dark:text-gray-500"
                                                data-oid="kft_fo."
                                            >
                                                <svg
                                                    className="h-5 w-5 inline"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    data-oid="xjd6hvb"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                        clipRule="evenodd"
                                                        data-oid="vtagjwa"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm"
                                        data-oid="fb.5w3r"
                                    >
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rule.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                                            data-oid="xdc8dtt"
                                        >
                                            {rule.status === 'active' ? '已启用' : '已禁用'}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                        data-oid="-cc_o_c"
                                    >
                                        <button
                                            onClick={() => toggleRuleStatus(rule.id)}
                                            className={`${rule.status === 'active' ? 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300' : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'} mr-3`}
                                            data-oid="8me8zs1"
                                        >
                                            {rule.status === 'active' ? '禁用' : '启用'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRule(rule.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            data-oid="a3x1s15"
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

            {/* AI Integration Settings */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="ai-settings-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="ai-settings-header"
                >
                    <div className="flex justify-between items-center" data-oid=":j7_d2x">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="ai-settings-title"
                        >
                            AI集成设置
                        </h3>
                        <div className="flex items-center space-x-2" data-oid="ai-toggle">
                            <label
                                htmlFor="ai-enabled-switch"
                                className="text-sm text-gray-700 dark:text-gray-300"
                                data-oid="ai-enabled-label"
                            >
                                启用AI
                            </label>
                            <div
                                className="relative inline-block w-10 mr-2 align-middle select-none"
                                data-oid="toggle-container"
                            >
                                <input
                                    type="checkbox"
                                    id="ai-enabled-switch"
                                    checked={aiSettings.enabled}
                                    onChange={() =>
                                        setAiSettings({
                                            ...aiSettings,
                                            enabled: !aiSettings.enabled,
                                        })
                                    }
                                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                    data-oid="toggle-input"
                                />

                                <label
                                    htmlFor="ai-enabled-switch"
                                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${aiSettings.enabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    data-oid="toggle-label"
                                ></label>
                            </div>
                        </div>
                    </div>
                </div>

                {aiSettings.enabled && (
                    <div className="px-6 py-4" data-oid="ai-settings-form">
                        <form onSubmit={handleAiSettingsUpdate} data-oid="lats5b3">
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                data-oid="fhszjob"
                            >
                                <div data-oid="0_r4umc">
                                    <label
                                        htmlFor="ai-model"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="gi49_ct"
                                    >
                                        AI模型
                                    </label>
                                    <select
                                        id="ai-model"
                                        value={aiSettings.model}
                                        onChange={(e) =>
                                            setAiSettings({ ...aiSettings, model: e.target.value })
                                        }
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="99o6hir"
                                    >
                                        <option value="gpt-4" data-oid="j5sa29h">
                                            GPT-4
                                        </option>
                                        <option value="gpt-3.5-turbo" data-oid="2p3l1jo">
                                            GPT-3.5 Turbo
                                        </option>
                                        <option value="claude-2" data-oid="lhxkzbw">
                                            Claude 2
                                        </option>
                                        <option value="llama-2" data-oid="t3m78f4">
                                            Llama 2
                                        </option>
                                    </select>
                                </div>
                                <div data-oid="s4jyt14">
                                    <label
                                        htmlFor="ai-api-key"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="1bsdfk0"
                                    >
                                        API密钥
                                    </label>
                                    <input
                                        type="password"
                                        id="ai-api-key"
                                        value={aiSettings.apiKey}
                                        onChange={(e) =>
                                            setAiSettings({ ...aiSettings, apiKey: e.target.value })
                                        }
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="6lronrl"
                                    />
                                </div>
                                <div data-oid="eke4zsb">
                                    <label
                                        htmlFor="ai-max-tokens"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="coihzy1"
                                    >
                                        最大Token数
                                    </label>
                                    <input
                                        type="number"
                                        id="ai-max-tokens"
                                        value={aiSettings.maxTokens}
                                        onChange={(e) =>
                                            setAiSettings({
                                                ...aiSettings,
                                                maxTokens: parseInt(e.target.value),
                                            })
                                        }
                                        min="100"
                                        max="2000"
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="kv_2ap0"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end" data-oid="3x6:1-e">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    data-oid="4zpf_nx"
                                >
                                    保存设置
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div
                    className="px-6 py-4 border-t border-gray-200 dark:border-gray-700"
                    data-oid="ai-documentation"
                >
                    <h4
                        className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
                        data-oid="zo5w6ec"
                    >
                        AI处理能力说明
                    </h4>
                    <ul
                        className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1"
                        data-oid="znppykr"
                    >
                        <li data-oid="li15oef">
                            告警分类：AI可以自动分析告警内容，为告警添加适当的分类标签
                        </li>
                        <li data-oid="6uz58k:">
                            告警摘要：AI可以生成简洁的告警摘要，帮助快速理解告警内容
                        </li>
                        <li data-oid=".zf5o1_">
                            上下文丰富：AI可以添加相关的上下文信息，帮助理解告警的原因和影响
                        </li>
                        <li data-oid="cus3faw">解决建议：AI可以提供可能的解决方案或处理建议</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
