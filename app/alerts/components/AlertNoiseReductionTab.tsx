import { useState } from 'react';

interface AlertGroup {
    id: string;
    name: string;
    description: string;
    rules: string[];
    alertCount: number;
    status: 'active' | 'inactive';
    destination: string[];
}

interface AlertRule {
    id: string;
    name: string;
    condition: string;
    groupId: string | null;
    status: 'active' | 'inactive';
}

export default function AlertNoiseReductionTab() {
    // Sample alert groups for noise reduction
    const [alertGroups, setAlertGroups] = useState<AlertGroup[]>([
        {
            id: '1',
            name: '数据库告警聚合',
            description: '将所有数据库相关告警聚合在一起',
            rules: [
                '包含关键词: 数据库, DB, database',
                '来源: Zabbix, Prometheus',
                '严重程度: 高, 中',
            ],

            alertCount: 8,
            status: 'active',
            destination: ['运维团队', '数据库团队', '企业微信'],
        },
        {
            id: '2',
            name: '网络告警聚合',
            description: '聚合所有网络相关告警',
            rules: [
                '包含关键词: 网络, network, 连接, connection',
                '来源: Zabbix, Nagios',
                '严重程度: 高, 中, 低',
            ],

            alertCount: 5,
            status: 'active',
            destination: ['网络团队', '运维团队', '钉钉'],
        },
        {
            id: '3',
            name: 'API服务告警聚合',
            description: '聚合所有API服务相关告警',
            rules: ['包含关键词: API, 服务, service', '来源: Prometheus, ELK', '严重程度: 高, 中'],
            alertCount: 6,
            status: 'inactive',
            destination: ['开发团队', '运维团队', '邮件'],
        },
    ]);

    // Sample alert rules
    const [alertRules, setAlertRules] = useState<AlertRule[]>([
        {
            id: '1',
            name: '数据库关键词匹配',
            condition: '消息包含 "数据库", "DB", "database"',
            groupId: '1',
            status: 'active',
        },
        {
            id: '2',
            name: '数据库来源匹配',
            condition: '告警来源为 Zabbix 或 Prometheus',
            groupId: '1',
            status: 'active',
        },
        {
            id: '3',
            name: '网络关键词匹配',
            condition: '消息包含 "网络", "network", "连接", "connection"',
            groupId: '2',
            status: 'active',
        },
        {
            id: '4',
            name: 'API服务关键词匹配',
            condition: '消息包含 "API", "服务", "service"',
            groupId: '3',
            status: 'active',
        },
        {
            id: '5',
            name: '未分组的CPU告警规则',
            condition: '消息包含 "CPU" 且严重程度为 "高"',
            groupId: null,
            status: 'active',
        },
    ]);

    // State for new group form
    const [showGroupForm, setShowGroupForm] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: '',
        description: '',
        destination: [] as string[],
    });

    // State for new rule form
    const [showRuleForm, setShowRuleForm] = useState(false);
    const [newRule, setNewRule] = useState({
        name: '',
        condition: '',
        groupId: '',
    });

    // Handle group actions
    const toggleGroupStatus = (groupId: string) => {
        setAlertGroups(
            alertGroups.map((group) =>
                group.id === groupId
                    ? { ...group, status: group.status === 'active' ? 'inactive' : 'active' }
                    : group,
            ),
        );
    };

    const handleDeleteGroup = (groupId: string) => {
        setAlertGroups(alertGroups.filter((group) => group.id !== groupId));
        // Also update rules that were in this group
        setAlertRules(
            alertRules.map((rule) =>
                rule.groupId === groupId ? { ...rule, groupId: null } : rule,
            ),
        );
    };

    // Handle rule actions
    const toggleRuleStatus = (ruleId: string) => {
        setAlertRules(
            alertRules.map((rule) =>
                rule.id === ruleId
                    ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
                    : rule,
            ),
        );
    };

    const handleDeleteRule = (ruleId: string) => {
        setAlertRules(alertRules.filter((rule) => rule.id !== ruleId));
    };

    // Handle form submissions
    const handleAddGroup = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = (alertGroups.length + 1).toString();
        setAlertGroups([
            ...alertGroups,
            {
                id: newId,
                name: newGroup.name,
                description: newGroup.description,
                rules: [],
                alertCount: 0,
                status: 'active',
                destination: newGroup.destination,
            },
        ]);
        setNewGroup({ name: '', description: '', destination: [] });
        setShowGroupForm(false);
    };

    const handleAddRule = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = (alertRules.length + 1).toString();
        setAlertRules([
            ...alertRules,
            {
                id: newId,
                name: newRule.name,
                condition: newRule.condition,
                groupId: newRule.groupId || null,
                status: 'active',
            },
        ]);
        setNewRule({ name: '', condition: '', groupId: '' });
        setShowRuleForm(false);
    };

    return (
        <div className="mt-6" data-oid="alert-noise-reduction-container">
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
                        告警降噪
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300" data-oid="intro-description">
                        告警降噪功能可以将多个相关的告警聚合在一起，减少告警风暴，提高告警的可读性和处理效率。您可以创建告警聚合规则，设置聚合条件，并将聚合后的告警发送到指定的通知渠道。
                    </p>
                </div>
            </div>

            {/* Alert Groups Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="groups-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="groups-header"
                >
                    <div className="flex justify-between items-center" data-oid="a-08iw.">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="groups-title"
                        >
                            告警聚合组
                        </h3>
                        <button
                            onClick={() => setShowGroupForm(!showGroupForm)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            data-oid="add-group-button"
                        >
                            {showGroupForm ? '取消' : '添加聚合组'}
                        </button>
                    </div>
                </div>

                {showGroupForm && (
                    <div
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                        data-oid="group-form"
                    >
                        <form onSubmit={handleAddGroup} data-oid="80fb6yk">
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                data-oid="afpr3hr"
                            >
                                <div data-oid="9e9hcwx">
                                    <label
                                        htmlFor="group-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="jj1zow_"
                                    >
                                        聚合组名称
                                    </label>
                                    <input
                                        type="text"
                                        id="group-name"
                                        value={newGroup.name}
                                        onChange={(e) =>
                                            setNewGroup({ ...newGroup, name: e.target.value })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="a-1k6z3"
                                    />
                                </div>
                                <div data-oid="69r4ry_">
                                    <label
                                        htmlFor="group-description"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="1yw35sx"
                                    >
                                        描述
                                    </label>
                                    <input
                                        type="text"
                                        id="group-description"
                                        value={newGroup.description}
                                        onChange={(e) =>
                                            setNewGroup({
                                                ...newGroup,
                                                description: e.target.value,
                                            })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="uq54jpp"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end" data-oid="nq7zj5j">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    data-oid="w::a.nl"
                                >
                                    保存
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="overflow-x-auto" data-oid="groups-table">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="05bgwuq"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="bcw:rey">
                            <tr data-oid="gu73c2g">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="fo7ngzz"
                                >
                                    聚合组名称
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="mkmkg3d"
                                >
                                    描述
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="h.44_k4"
                                >
                                    规则
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="7y53-j-"
                                >
                                    告警数量
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="r9cj2.l"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="d20c8kd"
                                >
                                    目标通道
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="v-wbydy"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="g:pc4l9"
                        >
                            {alertGroups.map((group) => (
                                <tr key={group.id} data-oid="ssz6gj-">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                        data-oid="nwfu9et"
                                    >
                                        {group.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="_-9:vvh"
                                    >
                                        {group.description}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="-kw3b:y"
                                    >
                                        <ul className="list-disc pl-5" data-oid="d6p0il-">
                                            {group.rules.map((rule, index) => (
                                                <li key={index} data-oid="pk.st5z">
                                                    {rule}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="ka3rt.r"
                                    >
                                        {group.alertCount}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm"
                                        data-oid="x.l1:z3"
                                    >
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${group.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                                            data-oid="bx1y:55"
                                        >
                                            {group.status === 'active' ? '已启用' : '已禁用'}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="bq_ekb7"
                                    >
                                        {group.destination.join(', ')}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                        data-oid="ozeg9he"
                                    >
                                        <button
                                            onClick={() => toggleGroupStatus(group.id)}
                                            className={`${group.status === 'active' ? 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300' : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'} mr-3`}
                                            data-oid="9gf3yn6"
                                        >
                                            {group.status === 'active' ? '禁用' : '启用'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteGroup(group.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            data-oid="9jp:7ol"
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

            {/* Alert Rules Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="rules-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="rules-header"
                >
                    <div className="flex justify-between items-center" data-oid="xo_yra1">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="rules-title"
                        >
                            告警规则
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
                        <form onSubmit={handleAddRule} data-oid="j3-98i-">
                            <div
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                data-oid="2oxmb4w"
                            >
                                <div data-oid="zr.sqlj">
                                    <label
                                        htmlFor="rule-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="4ridmqh"
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
                                        data-oid=":t0d79."
                                    />
                                </div>
                                <div data-oid="ly7e9hx">
                                    <label
                                        htmlFor="rule-condition"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="jkm6-b7"
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
                                        placeholder="例如: 消息包含 'CPU'"
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="ll-tjo."
                                    />
                                </div>
                                <div data-oid="n:1p_n-">
                                    <label
                                        htmlFor="rule-group"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="fl4bbua"
                                    >
                                        所属聚合组
                                    </label>
                                    <select
                                        id="rule-group"
                                        value={newRule.groupId}
                                        onChange={(e) =>
                                            setNewRule({ ...newRule, groupId: e.target.value })
                                        }
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="8g449s."
                                    >
                                        <option value="" data-oid="0kt:58o">
                                            无聚合组
                                        </option>
                                        {alertGroups.map((group) => (
                                            <option
                                                key={group.id}
                                                value={group.id}
                                                data-oid=":g25iea"
                                            >
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end" data-oid="28r:7vn">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    data-oid="2dr.s_y"
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
                        data-oid="kedkkp1"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="fex2u4y">
                            <tr data-oid="d0vi8e2">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="lsf0mta"
                                >
                                    规则名称
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="2etadoc"
                                >
                                    条件
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid=":c__ile"
                                >
                                    所属聚合组
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="dx_numr"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="9ppu9ig"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="-mh4xx1"
                        >
                            {alertRules.map((rule) => (
                                <tr key={rule.id} data-oid="7c-dkj2">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                        data-oid="szurqag"
                                    >
                                        {rule.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="y7r:dw:"
                                    >
                                        {rule.condition}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="vbqh3hk"
                                    >
                                        {rule.groupId
                                            ? alertGroups.find((g) => g.id === rule.groupId)
                                                  ?.name || '未找到'
                                            : '无聚合组'}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm"
                                        data-oid="3et7xxa"
                                    >
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${rule.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                                            data-oid="hl3xd4f"
                                        >
                                            {rule.status === 'active' ? '已启用' : '已禁用'}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                        data-oid="5yboa:9"
                                    >
                                        <button
                                            onClick={() => toggleRuleStatus(rule.id)}
                                            className={`${rule.status === 'active' ? 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300' : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'} mr-3`}
                                            data-oid="35aidzi"
                                        >
                                            {rule.status === 'active' ? '禁用' : '启用'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRule(rule.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            data-oid="_l8vv61"
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
    );
}
