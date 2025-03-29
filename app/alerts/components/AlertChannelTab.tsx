import { useState } from 'react';

interface AlertChannel {
    id: string;
    name: string;
    type:
        | 'wechat'
        | 'enterprise-wechat'
        | 'dingtalk'
        | 'dingtalk-webhook'
        | 'email'
        | 'sms'
        | 'custom';
    config: Record<string, string>;
    status: 'active' | 'inactive';
    lastSent: string | null;
}

export default function AlertChannelTab() {
    // Sample alert channels
    const [alertChannels, setAlertChannels] = useState<AlertChannel[]>([
        {
            id: '1',
            name: '运维团队企业微信',
            type: 'enterprise-wechat',
            config: {
                corpId: 'ww12345678',
                agentId: '1000002',
                secret: '********',
                toUser: '@all',
            },
            status: 'active',
            lastSent: '2025-03-29 17:30:00',
        },
        {
            id: '2',
            name: '开发团队钉钉群',
            type: 'dingtalk',
            config: {
                accessToken: '********',
                secret: '********',
            },
            status: 'active',
            lastSent: '2025-03-29 16:45:00',
        },
        {
            id: '3',
            name: '管理层邮件通知',
            type: 'email',
            config: {
                smtpServer: 'smtp.example.com',
                smtpPort: '587',
                username: 'alerts@example.com',
                password: '********',
                recipients: 'manager1@example.com,manager2@example.com',
            },
            status: 'inactive',
            lastSent: '2025-03-28 09:15:00',
        },
    ]);

    // State for new channel form
    const [showChannelForm, setShowChannelForm] = useState(false);
    const [channelType, setChannelType] = useState<string>('wechat');
    const [newChannel, setNewChannel] = useState({
        name: '',
        config: {} as Record<string, string>,
    });

    // Handle channel actions
    const toggleChannelStatus = (channelId: string) => {
        setAlertChannels(
            alertChannels.map((channel) =>
                channel.id === channelId
                    ? { ...channel, status: channel.status === 'active' ? 'inactive' : 'active' }
                    : channel,
            ),
        );
    };

    const handleDeleteChannel = (channelId: string) => {
        setAlertChannels(alertChannels.filter((channel) => channel.id !== channelId));
    };

    // Handle channel test
    const handleTestChannel = (channelId: string) => {
        alert(`测试发送到通道 ${alertChannels.find((c) => c.id === channelId)?.name}`);
        // In a real implementation, this would send a test message to the channel
    };

    // Get config fields based on channel type
    const getConfigFields = (type: string) => {
        switch (type) {
            case 'wechat':
                return [
                    { key: 'appId', label: 'AppID', type: 'text' },
                    { key: 'appSecret', label: 'AppSecret', type: 'password' },
                    { key: 'templateId', label: '模板ID', type: 'text' },
                ];

            case 'enterprise-wechat':
                return [
                    { key: 'corpId', label: '企业ID', type: 'text' },
                    { key: 'agentId', label: '应用ID', type: 'text' },
                    { key: 'secret', label: '应用Secret', type: 'password' },
                    { key: 'toUser', label: '接收人', type: 'text' },
                ];

            case 'dingtalk':
                return [
                    { key: 'accessToken', label: 'AccessToken', type: 'password' },
                    { key: 'secret', label: 'Secret', type: 'password' },
                ];

            case 'dingtalk-webhook':
                return [
                    { key: 'webhookUrl', label: 'Webhook URL', type: 'text' },
                    { key: 'secret', label: 'Secret', type: 'password' },
                ];

            case 'email':
                return [
                    { key: 'smtpServer', label: 'SMTP服务器', type: 'text' },
                    { key: 'smtpPort', label: 'SMTP端口', type: 'text' },
                    { key: 'username', label: '用户名', type: 'text' },
                    { key: 'password', label: '密码', type: 'password' },
                    { key: 'recipients', label: '收件人(逗号分隔)', type: 'text' },
                ];

            case 'sms':
                return [
                    { key: 'provider', label: '服务提供商', type: 'text' },
                    { key: 'apiKey', label: 'API密钥', type: 'password' },
                    { key: 'phoneNumbers', label: '手机号码(逗号分隔)', type: 'text' },
                ];

            case 'custom':
                return [
                    { key: 'url', label: 'API URL', type: 'text' },
                    { key: 'method', label: '请求方法', type: 'text' },
                    { key: 'headers', label: '请求头(JSON格式)', type: 'text' },
                    { key: 'body', label: '请求体模板', type: 'textarea' },
                ];

            default:
                return [];
        }
    };

    // Handle form change
    const handleConfigChange = (key: string, value: string) => {
        setNewChannel({
            ...newChannel,
            config: {
                ...newChannel.config,
                [key]: value,
            },
        });
    };

    // Handle form submission
    const handleAddChannel = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = (alertChannels.length + 1).toString();
        setAlertChannels([
            ...alertChannels,
            {
                id: newId,
                name: newChannel.name,
                type: channelType as any,
                config: newChannel.config,
                status: 'active',
                lastSent: null,
            },
        ]);
        setNewChannel({ name: '', config: {} });
        setShowChannelForm(false);
    };

    return (
        <div className="mt-6" data-oid="alert-channel-container">
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
                        告警通道管理
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300" data-oid="intro-description">
                        告警通道管理功能允许您配置多种告警发送渠道，包括微信、企业微信、钉钉、邮件等。您可以添加、编辑和管理这些通道，确保告警能够及时送达到相关人员。
                    </p>
                </div>
            </div>

            {/* Alert Channels Section */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6"
                data-oid="channels-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="channels-header"
                >
                    <div className="flex justify-between items-center" data-oid="qmnvl20">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="channels-title"
                        >
                            通知渠道
                        </h3>
                        <button
                            onClick={() => setShowChannelForm(!showChannelForm)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            data-oid="add-channel-button"
                        >
                            {showChannelForm ? '取消' : '添加通道'}
                        </button>
                    </div>
                </div>

                {showChannelForm && (
                    <div
                        className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                        data-oid="channel-form"
                    >
                        <form onSubmit={handleAddChannel} data-oid="_zcukig">
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                                data-oid="s9awmkl"
                            >
                                <div data-oid="x4phbae">
                                    <label
                                        htmlFor="channel-name"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid=":2qbd.n"
                                    >
                                        通道名称
                                    </label>
                                    <input
                                        type="text"
                                        id="channel-name"
                                        value={newChannel.name}
                                        onChange={(e) =>
                                            setNewChannel({ ...newChannel, name: e.target.value })
                                        }
                                        required
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="j_:ho-5"
                                    />
                                </div>
                                <div data-oid="00u9l6n">
                                    <label
                                        htmlFor="channel-type"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        data-oid="hext_y."
                                    >
                                        通道类型
                                    </label>
                                    <select
                                        id="channel-type"
                                        value={channelType}
                                        onChange={(e) => {
                                            setChannelType(e.target.value);
                                            setNewChannel({ ...newChannel, config: {} });
                                        }}
                                        className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                        data-oid="wkezp-x"
                                    >
                                        <option value="wechat" data-oid="l5_o1p0">
                                            微信
                                        </option>
                                        <option value="enterprise-wechat" data-oid="stjif6e">
                                            企业微信
                                        </option>
                                        <option value="dingtalk" data-oid="ou262as">
                                            钉钉
                                        </option>
                                        <option value="dingtalk-webhook" data-oid="3bkgupt">
                                            钉钉Webhook
                                        </option>
                                        <option value="email" data-oid="u80wppl">
                                            邮件
                                        </option>
                                        <option value="sms" data-oid="efhj1iu">
                                            短信
                                        </option>
                                        <option value="custom" data-oid="m0sqk2b">
                                            自定义
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div
                                className="border-t border-gray-200 dark:border-gray-700 pt-4"
                                data-oid="j650evl"
                            >
                                <h4
                                    className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3"
                                    data-oid="2f9mpm_"
                                >
                                    配置参数
                                </h4>
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    data-oid="phhh5bc"
                                >
                                    {getConfigFields(channelType).map((field) => (
                                        <div key={field.key} data-oid="90zwn0w">
                                            <label
                                                htmlFor={`config-${field.key}`}
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                data-oid=".bs9fo0"
                                            >
                                                {field.label}
                                            </label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    id={`config-${field.key}`}
                                                    value={newChannel.config[field.key] || ''}
                                                    onChange={(e) =>
                                                        handleConfigChange(
                                                            field.key,
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                    rows={3}
                                                    className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                                    data-oid="_6qsx_q"
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    id={`config-${field.key}`}
                                                    value={newChannel.config[field.key] || ''}
                                                    onChange={(e) =>
                                                        handleConfigChange(
                                                            field.key,
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                    className="block w-full border-gray-300 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                                                    data-oid="r_cys8:"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end" data-oid=":jqt048">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    data-oid="9_47kh4"
                                >
                                    保存
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="overflow-x-auto" data-oid="channels-table">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="9c8jurj"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="4uyz7f5">
                            <tr data-oid="i0.etmv">
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="ss5uhou"
                                >
                                    通道名称
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="t2.h5o8"
                                >
                                    类型
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="93p9szv"
                                >
                                    状态
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="zx8sodp"
                                >
                                    最后发送
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="ttcsq2l"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="_brybs4"
                        >
                            {alertChannels.map((channel) => (
                                <tr key={channel.id} data-oid="c20:2..">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                        data-oid="6_8238z"
                                    >
                                        {channel.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="7kc5gtc"
                                    >
                                        {channel.type === 'wechat' && '微信'}
                                        {channel.type === 'enterprise-wechat' && '企业微信'}
                                        {channel.type === 'dingtalk' && '钉钉'}
                                        {channel.type === 'dingtalk-webhook' && '钉钉Webhook'}
                                        {channel.type === 'email' && '邮件'}
                                        {channel.type === 'sms' && '短信'}
                                        {channel.type === 'custom' && '自定义'}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm"
                                        data-oid="-s-sryv"
                                    >
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${channel.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}
                                            data-oid="zjfq7qi"
                                        >
                                            {channel.status === 'active' ? '已启用' : '已禁用'}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="htda13f"
                                    >
                                        {channel.lastSent || '从未发送'}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                        data-oid="kuu88yy"
                                    >
                                        <button
                                            onClick={() => handleTestChannel(channel.id)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                            data-oid="c_5fffh"
                                        >
                                            测试
                                        </button>
                                        <button
                                            onClick={() => toggleChannelStatus(channel.id)}
                                            className={`${channel.status === 'active' ? 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300' : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'} mr-3`}
                                            data-oid="cyvchxr"
                                        >
                                            {channel.status === 'active' ? '禁用' : '启用'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteChannel(channel.id)}
                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                            data-oid=":kqkcba"
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

            {/* Channel Documentation */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="documentation-container"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="documentation-header"
                >
                    <h3
                        className="text-lg font-medium text-gray-900 dark:text-white"
                        data-oid="documentation-title"
                    >
                        通道配置说明
                    </h3>
                </div>
                <div className="px-6 py-4" data-oid="documentation-content">
                    <div className="space-y-4" data-oid="hopzh1h">
                        <div data-oid="dxph2wk">
                            <h4
                                className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="b8_8ao3"
                            >
                                微信
                            </h4>
                            <p
                                className="text-sm text-gray-600 dark:text-gray-400"
                                data-oid="c87kg56"
                            >
                                需要配置公众号AppID、AppSecret和模板消息ID。请确保已在微信公众平台开通模板消息功能。
                            </p>
                        </div>
                        <div data-oid="96uov2l">
                            <h4
                                className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="ow5vhfq"
                            >
                                企业微信
                            </h4>
                            <p
                                className="text-sm text-gray-600 dark:text-gray-400"
                                data-oid="g7nygpe"
                            >
                                需要配置企业ID、应用ID、应用Secret和接收人。接收人可以是指定成员（如"zhangsan"）、部门（如"@all"）或标签（如"TagName"）。
                            </p>
                        </div>
                        <div data-oid="2pkt5qc">
                            <h4
                                className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="40-99xi"
                            >
                                钉钉
                            </h4>
                            <p
                                className="text-sm text-gray-600 dark:text-gray-400"
                                data-oid="zn4-xb:"
                            >
                                需要配置AccessToken和Secret。请在钉钉开放平台创建应用并获取相关凭证。
                            </p>
                        </div>
                        <div data-oid="geo:z7v">
                            <h4
                                className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2"
                                data-oid="_jcqyge"
                            >
                                钉钉Webhook
                            </h4>
                            <p
                                className="text-sm text-gray-600 dark:text-gray-400"
                                data-oid="p37kgx5"
                            >
                                需要配置Webhook
                                URL和安全设置中的Secret。可在钉钉群设置中找到Webhook机器人设置。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
