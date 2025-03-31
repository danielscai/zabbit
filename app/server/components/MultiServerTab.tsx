import { useState } from 'react';

interface Server {
    id: string;
    name: string;
    url: string;
    status: 'online' | 'offline' | 'warning';
    version: string;
    lastChecked: string;
}

export default function MultiServerTab() {
    const [showAddServerDialog, setShowAddServerDialog] = useState(false);
    const [servers, setServers] = useState<Server[]>([
        {
            id: '1',
            name: '生产环境 Zabbix',
            url: 'https://zabbix-prod.example.com',
            status: 'online',
            version: '6.4.0',
            lastChecked: '2025-03-29 15:30:00',
        },
        {
            id: '2',
            name: '测试环境 Zabbix',
            url: 'https://zabbix-test.example.com',
            status: 'warning',
            version: '6.4.0',
            lastChecked: '2025-03-29 15:30:00',
        },
        {
            id: '3',
            name: '开发环境 Zabbix',
            url: 'https://zabbix-dev.example.com',
            status: 'offline',
            version: '6.2.0',
            lastChecked: '2025-03-29 15:30:00',
        },
    ]);

    return (
        <div className="mt-6" data-oid="hfvi6g6">
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                data-oid="9jt1fyo"
            >
                <div
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    data-oid="hflf1fc"
                >
                    <div className="flex justify-between items-center" data-oid="iw.sbmu">
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white"
                            data-oid="r7xapkn"
                        >
                            多Server管理
                        </h3>
                        <button
                            onClick={() => setShowAddServerDialog(true)}
                            className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            data-oid="9zhiq1r"
                        >
                            添加 Server
                        </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" data-oid="y0sak2q">
                        管理多个 Zabbix Server 实例
                    </p>
                </div>
                <div className="px-6 py-4" data-oid="m1-0-8g">
                    <table
                        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                        data-oid="n7j3jkl"
                    >
                        <thead className="bg-gray-50 dark:bg-gray-700" data-oid="ckv4_hv">
                            <tr data-oid=":rxxu:q">
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="umc52-b"
                                >
                                    名称
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="g6w:tbz"
                                >
                                    URL
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid=".0kc:yd"
                                >
                                    状态
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="sss0p-e"
                                >
                                    版本
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="6vwaqpr"
                                >
                                    最后检查
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    data-oid="7qa565b"
                                >
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
                            data-oid="_zhyxxq"
                        >
                            {servers.map((server) => (
                                <tr key={server.id} data-oid="4:sj33p">
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                                        data-oid="2bs5w8n"
                                    >
                                        {server.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="d1waxb."
                                    >
                                        {server.url}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="-98uuh-"
                                    >
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${server.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : server.status === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}
                                            data-oid="z1tcov3"
                                        >
                                            {server.status === 'online'
                                                ? '在线'
                                                : server.status === 'warning'
                                                  ? '警告'
                                                  : '离线'}
                                        </span>
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="r0waz6d"
                                    >
                                        {server.version}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                                        data-oid="mby8mm1"
                                    >
                                        {server.lastChecked}
                                    </td>
                                    <td
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                                        data-oid=":kp9_qw"
                                    >
                                        <div className="flex space-x-2" data-oid="rp3vo.r">
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                data-oid="meqwdvr"
                                            >
                                                编辑
                                            </button>
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                data-oid="vq2-xc6"
                                            >
                                                查看
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                data-oid="_:j2l_b"
                                            >
                                                删除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showAddServerDialog && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
                    data-oid="t:fptat"
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
                        data-oid="c:6:bvz"
                    >
                        <h3
                            className="text-lg font-medium text-gray-900 dark:text-white mb-4"
                            data-oid="mcjfzpt"
                        >
                            添加 Zabbix Server
                        </h3>
                        <div className="space-y-4" data-oid="joxz.g5">
                            <div data-oid="drqm53h">
                                <label
                                    htmlFor="server-name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    data-oid="g2-qs7u"
                                >
                                    名称
                                </label>
                                <input
                                    type="text"
                                    id="server-name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="生产环境 Zabbix"
                                    data-oid="gg:k7ti"
                                />
                            </div>
                            <div data-oid="ezep_9.">
                                <label
                                    htmlFor="server-url"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    data-oid="s.p4kh:"
                                >
                                    URL
                                </label>
                                <input
                                    type="text"
                                    id="server-url"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="https://zabbix.example.com"
                                    data-oid="lhi2kq8"
                                />
                            </div>
                            <div data-oid="31gm5t3">
                                <label
                                    htmlFor="server-username"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    data-oid="ohw1pd0"
                                >
                                    用户名
                                </label>
                                <input
                                    type="text"
                                    id="server-username"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="Admin"
                                    data-oid="dq068xb"
                                />
                            </div>
                            <div data-oid="_kimit7">
                                <label
                                    htmlFor="server-password"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    data-oid="17o6:p3"
                                >
                                    密码
                                </label>
                                <input
                                    type="password"
                                    id="server-password"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="********"
                                    data-oid="-f59chq"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3" data-oid="hwdh6jk">
                            <button
                                onClick={() => setShowAddServerDialog(false)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                data-oid="ctg9u0_"
                            >
                                取消
                            </button>
                            <button
                                className="px-4 py-2 bg-purple-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                data-oid="b9b39au"
                            >
                                添加
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
