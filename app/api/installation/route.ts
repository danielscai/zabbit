import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';

const execAsync = promisify(exec);

interface InstallationRequest {
  step: string;
  mode: 'single' | 'cluster' | 'distributed';
}

// 检查 Docker 是否已安装并正在运行
async function checkDocker() {
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
async function checkDockerCompose() {
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
async function testImagePull() {
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
async function deployServices(mode: 'single' | 'cluster' | 'distributed') {
  try {
    const logs: string[] = ['开始部署 Zabbix 服务...'];
    
    // 创建临时目录存放 Docker Compose 文件
    const deployDir = '/tmp/zabbit-deploy';
    logs.push(`创建部署目录: ${deployDir}`);
    await execAsync(`mkdir -p ${deployDir}`);
    
    // 根据部署模式选择不同的配置
    let composeContent = '';
    
    if (mode === 'single') {
      logs.push('配置单机模式部署...');
      composeContent = `version: '3.5'

services:
  postgres:
    image: postgres:15-alpine
    container_name: zabbit-postgres
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_USER=zabbix
      - POSTGRES_DB=zabbix
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server
    ports:
      - "10051:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
    depends_on:
      - postgres
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web
    ports:
      - "8080:8080"
    environment:
      - ZBX_SERVER_HOST=zabbix-server
      - DB_SERVER_HOST=postgres
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
      - PHP_TZ=Asia/Shanghai
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
    } else if (mode === 'cluster') {
      logs.push('配置集群模式部署...');
      composeContent = `version: '3.5'

services:
  postgres-master:
    image: postgres:15-alpine
    container_name: zabbit-postgres-master
    volumes:
      - postgres-master-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_USER=zabbix
      - POSTGRES_DB=zabbix
    restart: unless-stopped
    networks:
      - zabbit-network

  postgres-slave:
    image: postgres:15-alpine
    container_name: zabbit-postgres-slave
    volumes:
      - postgres-slave-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_USER=zabbix
      - POSTGRES_DB=zabbix
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-master:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-master
    ports:
      - "10051:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-master-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-master
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
      - ZBX_NODEADDRESS=zabbit-server-master
    depends_on:
      - postgres-master
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-slave:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-slave
    ports:
      - "10052:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-slave-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-slave
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
      - ZBX_NODEADDRESS=zabbit-server-slave
    depends_on:
      - postgres-slave
    restart: unless-stopped
    networks:
      - zabbit-network

  haproxy:
    image: haproxy:2.6-alpine
    container_name: zabbit-haproxy
    ports:
      - "8080:8080"
      - "10053:10051"
    volumes:
      - haproxy-config:/usr/local/etc/haproxy
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web
    ports:
      - "8081:8080"
    environment:
      - ZBX_SERVER_HOST=haproxy
      - DB_SERVER_HOST=postgres-master
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
      - PHP_TZ=Asia/Shanghai
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
    container_name: zabbit-postgres-master
    volumes:
      - postgres-master-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_USER=zabbix
      - POSTGRES_DB=zabbix
    restart: unless-stopped
    networks:
      - zabbit-network

  postgres-slave-1:
    image: postgres:15-alpine
    container_name: zabbit-postgres-slave-1
    volumes:
      - postgres-slave-1-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_USER=zabbix
      - POSTGRES_DB=zabbix
    restart: unless-stopped
    networks:
      - zabbit-network

  postgres-slave-2:
    image: postgres:15-alpine
    container_name: zabbit-postgres-slave-2
    volumes:
      - postgres-slave-2-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_USER=zabbix
      - POSTGRES_DB=zabbix
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-master:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-master
    ports:
      - "10051:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-master-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-master
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
    depends_on:
      - postgres-master
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-node-1:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-node-1
    ports:
      - "10052:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-node-1-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-slave-1
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
    depends_on:
      - postgres-slave-1
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-server-node-2:
    image: zabbix/zabbix-server-pgsql:ubuntu-6.4-latest
    container_name: zabbit-server-node-2
    ports:
      - "10053:10051"
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - zabbix-server-node-2-data:/var/lib/zabbix
    environment:
      - DB_SERVER_HOST=postgres-slave-2
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
    depends_on:
      - postgres-slave-2
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web-master:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-master
    ports:
      - "8080:8080"
    environment:
      - ZBX_SERVER_HOST=zabbix-server-master
      - DB_SERVER_HOST=postgres-master
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
      - PHP_TZ=Asia/Shanghai
    depends_on:
      - postgres-master
      - zabbix-server-master
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web-node-1:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-node-1
    ports:
      - "8081:8080"
    environment:
      - ZBX_SERVER_HOST=zabbix-server-node-1
      - DB_SERVER_HOST=postgres-slave-1
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
      - PHP_TZ=Asia/Shanghai
    depends_on:
      - postgres-slave-1
      - zabbix-server-node-1
    restart: unless-stopped
    networks:
      - zabbit-network

  zabbix-web-node-2:
    image: zabbix/zabbix-web-nginx-pgsql:ubuntu-6.4-latest
    container_name: zabbit-web-node-2
    ports:
      - "8082:8080"
    environment:
      - ZBX_SERVER_HOST=zabbix-server-node-2
      - DB_SERVER_HOST=postgres-slave-2
      - POSTGRES_USER=zabbix
      - POSTGRES_PASSWORD=zabbix
      - POSTGRES_DB=zabbix
      - PHP_TZ=Asia/Shanghai
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
    
    // 使用 fs 模块写入文件，而不是通过 echo 命令
    fs.writeFileSync(composeFilePath, composeContent);
    
    // 启动服务
    logs.push('启动 Zabbix 服务...');
    const { stdout: composeOutput } = await execAsync(`cd ${deployDir} && docker compose up -d --build`);
    logs.push(composeOutput);
    
    // 检查服务状态
    logs.push('检查服务状态...');
    const { stdout: statusOutput } = await execAsync(`cd ${deployDir} && docker compose ps`);
    logs.push(statusOutput);
    
    // 等待服务启动
    logs.push('等待服务启动...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 获取服务访问地址
    let accessUrl = '';
    if (mode === 'single') {
      accessUrl = 'http://localhost:8080';
    } else if (mode === 'cluster') {
      accessUrl = 'http://localhost:8080, http://localhost:8081';
    } else {
      accessUrl = 'http://localhost:8080, http://localhost:8081, http://localhost:8082';
    }
    
    logs.push(`✅ Zabbix 服务部署完成！`);
    logs.push(`访问地址: ${accessUrl}`);
    logs.push(`默认用户名: Admin`);
    logs.push(`默认密码: zabbix`);
    
    return {
      success: true,
      logs
    };
  } catch (error: any) {
    console.error('部署服务失败:', error);
    return {
      success: false,
      error: `部署服务失败: ${error.message}`
    };
  }
}

// API 路由处理函数
export async function POST(request: Request) {
  try {
    const body: InstallationRequest = await request.json();
    const { step, mode } = body;
    
    // 根据步骤执行相应的操作
    let result;
    
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
        result = await deployServices(mode);
        break;
        
      default:
        return NextResponse.json(
          { error: '未知的安装步骤' },
          { status: 400 }
        );
    }
    
    // 处理操作结果
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ logs: result.logs });
  } catch (error: any) {
    console.error('API 错误:', error);
    return NextResponse.json(
      { error: error.message || '处理请求时发生错误' },
      { status: 500 }
    );
  }
}
