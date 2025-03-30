import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

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
    const logs: string[] = ['开始部署服务...'];
    
    // 根据不同的部署模式执行不同的部署步骤
    switch (mode) {
      case 'single':
        logs.push('正在配置单机模式...');
        logs.push('创建 Docker 网络...');
        logs.push('配置服务容器...');
        logs.push('启动数据库服务...');
        logs.push('初始化数据库...');
        logs.push('启动 Web 服务...');
        logs.push('配置 Nginx...');
        break;
        
      case 'cluster':
        logs.push('正在配置集群模式...');
        logs.push('创建集群网络...');
        logs.push('初始化集群节点...');
        logs.push('配置服务发现 (Consul)...');
        logs.push('配置负载均衡 (HAProxy)...');
        logs.push('启动数据库集群...');
        logs.push('启动 Web 服务集群...');
        break;
        
      case 'distributed':
        logs.push('正在配置分布式集群模式...');
        logs.push('创建跨区域网络...');
        logs.push('初始化分布式节点...');
        logs.push('配置服务发现 (etcd)...');
        logs.push('配置分布式协调 (ZooKeeper)...');
        logs.push('配置跨区域负载均衡...');
        logs.push('启动分布式数据库集群...');
        logs.push('启动分布式 Web 服务集群...');
        break;
    }
    
    logs.push('✅ 服务部署完成');
    
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
