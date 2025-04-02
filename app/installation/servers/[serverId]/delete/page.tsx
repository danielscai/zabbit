'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ServerDetailLayout from '../../components/ServerDetailLayout';
import ServerDetail from '../../components/ServerDetail';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DeletePageProps {
    params: {
        serverId: string;
    };
}

export default function DeletePage({ params }: DeletePageProps) {
    const [serverName, setServerName] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!serverName) return;
        
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/servers/${params.serverId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirmName: serverName }),
            });

            if (response.ok) {
                router.push('/installation/servers');
            } else {
                // 处理错误
                console.error('删除失败');
            }
        } catch (error) {
            console.error('删除出错:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <ServerDetailLayout>
            <ServerDetail serverId={params.serverId} activeTab="delete">
                <div className="max-w-3xl mx-auto p-6">
                    <Card className="border-red-100 bg-red-50">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertCircle className="h-8 w-8 text-red-500" />
                                <h2 className="text-2xl font-semibold text-red-700">删除服务器</h2>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="p-4 bg-white rounded-lg border border-red-200">
                                    <p className="text-lg text-gray-700 mb-4">
                                        您即将删除此Zabbix服务器实例。此操作不可逆，请谨慎操作。
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        <li>所有监控数据将被永久删除</li>
                                        <li>所有告警规则将被清除</li>
                                        <li>所有关联的Agent配置将失效</li>
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <label className="block">
                                        <span className="text-gray-700">请输入"DELETE"以确认删除操作</span>
                                        <Input
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={serverName}
                                            onChange={(e) => setServerName(e.target.value)}
                                            placeholder="DELETE"
                                        />
                                    </label>

                                    <Button
                                        onClick={handleDelete}
                                        disabled={serverName !== 'DELETE' || isDeleting}
                                        className="w-full h-12 text-lg bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300"
                                    >
                                        {isDeleting ? '删除中...' : '确认删除'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ServerDetail>
        </ServerDetailLayout>
    );
} 