import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import { prisma } from '@/lib/prisma';

const execAsync = promisify(exec);

// 生成6-8位的短UUID
function generateShortId(length: number = 6): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

interface ServerConfig {
  mode: 'single' | 'cluster' | 'distributed';
  organization: string;
  region: string;
  port: string;
  username: string;
  password: string;
}

interface InstallationRequest {
  step: string;
  config: ServerConfig;
}

interface DeploymentResult {
  success: boolean;
  logs?: string[];
  error?: string;
  instanceId?: string;
}

interface CheckResult {
  success: boolean;
  logs?: string[];
  error?: string;
}

// 检查 Docker 是否已安装并正在运行
async function checkDocker(): Promise<CheckResult> {
  try {
    const { stdout: versionOutput } = await execAsync('docker --version');
    const { stdout: infoOutput } = await execAsync('docker info');
    
    return {
      success: true,
      logs: [
        versionOutput.trim(),
        '检查 Docker 守护进程...',
        'Docker 守护进程正在运行',
        '✅ Docker 环境检查通过'
      ]
    };
  } catch (error: any) {
    console.error('Docker 检查失败:', error);
    return {
      success: false,
      error: '无法连接到 Docker 守护进程，请确保 Docker 已安装并正在运行'
    };
  }
}

// 检查 Docker Compose 是否已安装
async function checkDockerCompose(): Promise<CheckResult> {
  try {
    const { stdout } = await execAsync('docker compose version');
    
    return {
      success: true,
      logs: [
        stdout.trim(),
        '✅ Docker Compose 检查通过'
      ]
    };
  } catch (error: any) {
    console.error('Docker Compose 检查失败:', error);
    return {
      success: false,
      error: 'Docker Compose 未安装或无法使用'
    };
  }
}

// 测试 Docker 拉取功能
async function testImagePull(): Promise<CheckResult> {
  try {
    const logs: string[] = ['测试 Docker 镜像拉取功能...'];
    
    // 使用轻量级的 busybox 镜像来测试 Docker 拉取功能
    const testImage = 'busybox:latest';
    
    logs.push(`正在拉取测试镜像 ${testImage}...`);
    
    // 执行真实的 docker pull 命令
    const { stdout } = await execAsync(`docker pull ${testImage}`);
    logs.push(stdout.trim());
    
    // 验证镜像是否成功拉取
    const { stdout: imageList } = await execAsync(`docker images ${testImage} --format "{{.Repository}}:{{.Tag}}"`);
    
    if (imageList.includes(testImage)) {
      logs.push(`✅ 成功拉取测试镜像 ${testImage}`);
      logs.push('Docker 拉取功能正常');
    } else {
      throw new Error(`无法验证 ${testImage} 镜像是否成功拉取`);
    }
    
    return {
      success: true,
      logs
    };
  } catch (error: any) {
    console.error('测试 Docker 拉取功能失败:', error);
    return {
      success: false,
      error: `Docker 拉取功能测试失败: ${error.message}`
    };
  }
}

// 部署服务
async function deployServices(config: ServerConfig): Promise<DeploymentResult> {
  try {
    // 生成短UUID
    const shortId = generateShortId(6);
    
    // 创建实例记录
    const instance = await prisma.zabbixInstance.create({
      data: {
        id: shortId,  // 使用短UUID作为实例ID
        name: `Zabbix-${config.mode}-${shortId}`,
        mode: config.mode,
        organization: config.organization,
        region: config.region,
        username: config.username,
        password: config.password,
        status: 'installing',
        version: '6.4'
      }
    });

    // 创建部署日志
    const deploymentLog = await prisma.deploymentLog.create({
      data: {
        instanceId: instance.id,
        step: 'deploy-services',
        status: 'running',
        logs: ['开始部署 Zabbix 服务...']
      }
    });

    // 在后台执行部署过程
    (async () => {
      try {
        const logs: string[] = ['开始部署 Zabbix 服务...'];
        
        // 创建临时目录存放 Docker Compose 文件
        const deployDir = `/tmp/zabbit-deploy-${shortId}`;
        logs.push(`创建部署目录: ${deployDir}`);
        await execAsync(`mkdir -p ${deployDir}`);
        
        // 修改 Docker Compose 项目名称
        const projectName = `zabbit-${shortId}`;
        
        // 根据部署模式选择不同的配置
        let composeContent = '';
        
        // 生成环境变量配置
        const dbEnvConfig = `
          - POSTGRES_PASSWORD=${config.password}
          - POSTGRES_USER=${config.username}
          - POSTGRES_DB=zabbix`;

        const zabbixEnvConfig = `
          - DB_SERVER_HOST=zabbit-postgres-${shortId}
          - DB_SERVER_PORT=5432
          - POSTGRES_USER=${config.username}
          - POSTGRES_PASSWORD=${config.password}
          - POSTGRES_DB=zabbix
          - ZBX_SERVER_HOST=zabbit-server-${shortId}
          - PHP_TZ=Asia/Shanghai`;
        
        if (config.mode === 'single') {
          logs.push('配置单机模式部署...');
          composeContent = `version: '3.5'

services:
  postgres:
    image: postgres:15-alpine
    container_name: zabbit-postgres-${shortId}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      ${dbEnvConfig}
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-${shortId}
    ports:
      - "${config.port}:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-data:/var/lib/zabbix
    environment:
      ${zabbixEnvConfig}
    depends_on:
      - postgres
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-${shortId}
    ports:
      - "${parseInt(config.port) + 1}:8080"
    environment:
      ${zabbixEnvConfig}
    depends_on:
      - postgres
      - zabbix-server
    restart: unless-stopped
    networks:
      - zabbit-network

networks:
  zabbit-network:
    driver: bridge

volumes:
  postgres-data:
  zabbix-server-data:`;
        } else if (config.mode === 'cluster') {
          logs.push('配置集群模式部署...');
          composeContent = `version: '3.5'

services:
  postgres-master:
    image: postgres:15-alpine
    container_name: zabbit-postgres-master-${shortId}
    volumes:
      - postgres-master-data:/var/lib/postgresql/data
    environment:
      ${dbEnvConfig}
    restart: unless-stopped
    networks:
      - zabbit-network

  postgres-slave:
    image: postgres:15-alpine
    container_name: zabbit-postgres-slave-${shortId}
    volumes:
      - postgres-slave-data:/var/lib/postgresql/data
    environment:
      ${dbEnvConfig}
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-master:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-master-${shortId}
    ports:
      - "${config.port}:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-master-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-master
      ${zabbixEnvConfig}
      - ZBX_NODEADDRESS=zabbit-server-master
    depends_on:
      - postgres-master
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-slave:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-slave-${shortId}
    ports:
      - "${parseInt(config.port) + 1}:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-slave-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-slave
      ${zabbixEnvConfig}
      - ZBX_NODEADDRESS=zabbit-server-slave
    depends_on:
      - postgres-slave
    restart: unless-stopped
    networks:
      - zabbit-network

  haproxy:
    image: haproxy:2.6-alpine
    container_name: zabbit-haproxy-${shortId}
    ports:
      - "${parseInt(config.port) + 2}:8080"
      - "${parseInt(config.port) + 3}:10051"
    volumes:
      - haproxy-config:/usr/local/etc/haproxy
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-master-${shortId}
    ports:
      - "${parseInt(config.port) + 4}:8080"
    environment:
      ${zabbixEnvConfig}
    depends_on:
      - postgres-master
      - zabbix-server-master
      - haproxy
    restart: unless-stopped
    networks:
      - zabbit-network

networks:
  zabbit-network:
    driver: bridge

volumes:
  postgres-master-data:
  postgres-slave-data:
  zabbix-server-master-data:
  zabbix-server-slave-data:
  haproxy-config:`;
        } else {
          logs.push('配置分布式集群模式部署...');
          composeContent = `version: '3.5'

services:
  postgres-master:
    image: postgres:15-alpine
    container_name: zabbit-postgres-master-${shortId}
    volumes:
      - postgres-master-data:/var/lib/postgresql/data
    environment:
      ${dbEnvConfig}
    restart: unless-stopped
    networks:
      - zabbit-network

  postgres-slave-1:
    image: postgres:15-alpine
    container_name: zabbit-postgres-slave-1-${shortId}
    volumes:
      - postgres-slave-1-data:/var/lib/postgresql/data
    environment:
      ${dbEnvConfig}
    restart: unless-stopped
    networks:
      - zabbit-network

  postgres-slave-2:
    image: postgres:15-alpine
    container_name: zabbit-postgres-slave-2-${shortId}
    volumes:
      - postgres-slave-2-data:/var/lib/postgresql/data
    environment:
      ${dbEnvConfig}
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-master:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-master-${shortId}
    ports:
      - "${config.port}:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-master-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-master
      ${zabbixEnvConfig}
    depends_on:
      - postgres-master
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-node-1:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-node-1-${shortId}
    ports:
      - "${parseInt(config.port) + 1}:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-node-1-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-slave-1
      ${zabbixEnvConfig}
    depends_on:
      - postgres-slave-1
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-node-2:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-node-2-${shortId}
    ports:
      - "${parseInt(config.port) + 2}:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-node-2-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-slave-2
      ${zabbixEnvConfig}
    depends_on:
      - postgres-slave-2
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web-master:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-master-${shortId}
    ports:
      - "${parseInt(config.port) + 3}:8080"
    environment:
      ${zabbixEnvConfig}
    depends_on:
      - postgres-master
      - zabbix-server-master
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web-node-1:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-node-1-${shortId}
    ports:
      - "${parseInt(config.port) + 4}:8080"
    environment:
      ${zabbixEnvConfig}
    depends_on:
      - postgres-slave-1
      - zabbix-server-node-1
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web-node-2:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-node-2-${shortId}
    ports:
      - "${parseInt(config.port) + 5}:8080"
    environment:
      ${zabbixEnvConfig}
    depends_on:
      - postgres-slave-2
      - zabbix-server-node-2
    restart: unless-stopped
    networks:
      - zabbit-network

networks:
  zabbit-network:
    driver: bridge

volumes:
  postgres-master-data:
  postgres-slave-1-data:
  postgres-slave-2-data:
  zabbix-server-master-data:
  zabbix-server-node-1-data:
  zabbix-server-node-2-data:`;
        }
        
        // 写入 Docker Compose 文件
        const composeFilePath = `${deployDir}/docker-compose.yml`;
        logs.push(`创建 Docker Compose 配置文件: ${composeFilePath}`);
        
        // 使用 fs 模块写入文件
        fs.writeFileSync(composeFilePath, composeContent);
        
        // 启动服务
        logs.push('启动 Zabbix 服务...');
        const { stdout: composeOutput } = await execAsync(`cd ${deployDir} && docker compose -p ${projectName} up -d --build`);
        logs.push(composeOutput);
        
        // 检查服务状态
        logs.push('检查服务状态...');
        const { stdout: statusOutput } = await execAsync(`cd ${deployDir} && docker compose -p ${projectName} ps`);
        logs.push(statusOutput);
        
        // 等待服务启动
        logs.push('等待服务启动...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // 获取容器ID列表
        const { stdout: containerIds } = await execAsync(`cd ${deployDir} && docker compose -p ${projectName} ps -q`);
        const containerIdList = containerIds.split('\n').filter(id => id.length > 0);

        // 获取服务访问地址
        let accessUrls: string[] = [];
        if (config.mode === 'single') {
          accessUrls = [`http://localhost:${parseInt(config.port) + 1}`];
        } else if (config.mode === 'cluster') {
          accessUrls = [
            `http://localhost:${parseInt(config.port) + 2}`,
            `http://localhost:${parseInt(config.port) + 4}`
          ];
        } else {
          accessUrls = [
            `http://localhost:${parseInt(config.port) + 3}`,
            `http://localhost:${parseInt(config.port) + 4}`,
            `http://localhost:${parseInt(config.port) + 5}`
          ];
        }

        // 更新实例状态
        await prisma.zabbixInstance.update({
          where: { id: instance.id },
          data: {
            status: 'running',
            accessUrl: accessUrls[0]
          }
        });

        // 更新部署日志
        await prisma.deploymentLog.update({
          where: { id: deploymentLog.id },
          data: {
            status: 'success',
            logs: [...logs, '✅ Zabbix 服务部署完成！', ...accessUrls.map(url => `访问地址: ${url}`)]
          }
        });
      } catch (error: any) {
        console.error('部署服务失败:', error);

        // 更新实例状态为错误
        await prisma.zabbixInstance.update({
          where: { id: instance.id },
          data: {
            status: 'error'
          }
        });

        // 更新部署日志
        await prisma.deploymentLog.update({
          where: { id: deploymentLog.id },
          data: {
            status: 'error',
            errorMessage: error.message,
            logs: [...(deploymentLog.logs || []), `错误: ${error.message}`]
          }
        });
      }
    })().catch(console.error); // 启动后台任务

    // 立即返回结果
    return {
      success: true,
      instanceId: instance.id
    };
  } catch (error: any) {
    console.error('创建实例记录失败:', error);
    return {
      success: false,
      error: `创建实例失败: ${error.message}`
    };
  }
}

// API 路由处理函数
export async function POST(request: Request) {
  try {
    const body: InstallationRequest = await request.json();
    const { step, config } = body;
    
    let result: CheckResult | DeploymentResult;
    let deploymentLog;
    
    // 创建部署日志
    if (step !== 'deploy-services') {
      deploymentLog = await prisma.deploymentLog.create({
        data: {
          instanceId: 'system-check', // 用于系统检查的特殊ID
          step,
          status: 'running',
          logs: []
        }
      });
    }
    
    switch (step) {
      case 'check-docker':
        result = await checkDocker();
        break;
        
      case 'check-compose':
        result = await checkDockerCompose();
        break;
        
      case 'pull-images':
        result = await testImagePull();
        break;
        
      case 'deploy-services':
        result = await deployServices(config);
        break;
        
      default:
        return NextResponse.json(
          { error: '未知的安装步骤' },
          { status: 400 }
        );
    }
    
    // 更新部署日志状态
    if (deploymentLog?.id) {
      await prisma.deploymentLog.update({
        where: { id: deploymentLog.id },
        data: {
          status: result.success ? 'success' : 'error',
          logs: result.logs || [],
          errorMessage: result.error
        }
      });
    }
    
    // 处理操作结果
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error,
          logs: result.logs || []
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      logs: result.logs || [],
      instanceId: step === 'deploy-services' ? (result as DeploymentResult).instanceId : undefined
    });
  } catch (error: any) {
    console.error('API 错误:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || '处理请求时发生错误',
        logs: []
      },
      { status: 500 }
    );
  }
}
