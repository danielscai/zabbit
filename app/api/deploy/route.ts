import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { ProxyConfig, defaultProxyConfig } from '@/config/proxy';

const execAsync = promisify(exec);

function buildProxyCommand(proxyConfig: ProxyConfig): string {
    return `export http_proxy=${proxyConfig.httpProxy} https_proxy=${proxyConfig.httpsProxy} all_proxy=${proxyConfig.allProxy} && `;
}

export async function POST(request: Request) {
    try {
        const { mode, proxyConfig = defaultProxyConfig } = await request.json();

        if (mode !== 'single') {
            return NextResponse.json(
                { error: '不支持的部署模式' },
                { status: 400 }
            );
        }

        // 获取 docker-compose.yml 的路径
        const dockerComposePath = path.join(process.cwd(), 'docker-compose.yml');

        // 检查 docker-compose.yml 是否存在
        try {
            await execAsync(`test -f ${dockerComposePath}`);
        } catch (error) {
            return NextResponse.json(
                { error: 'docker-compose.yml 文件不存在' },
                { status: 500 }
            );
        }

        // 构建带代理的命令
        const proxyCommand = buildProxyCommand(proxyConfig);
        const dockerComposeCommand = `docker-compose -f ${dockerComposePath} up -d`;
        const fullCommand = proxyCommand + dockerComposeCommand;

        // 执行命令
        const { stdout, stderr } = await execAsync(fullCommand);

        return NextResponse.json({
            success: true,
            message: '部署成功',
            stdout,
            stderr
        });
    } catch (error) {
        console.error('部署错误:', error);
        return NextResponse.json(
            { error: '部署失败：' + (error as Error).message },
            { status: 500 }
        );
    }
} 