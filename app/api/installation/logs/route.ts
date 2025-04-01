import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const instanceId = searchParams.get('instanceId');

    if (!instanceId) {
      return NextResponse.json(
        { error: '缺少 instanceId 参数' },
        { status: 400 }
      );
    }

    const logs = await prisma.deploymentLog.findMany({
      where: {
        instanceId: instanceId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('获取部署日志失败:', error);
    return NextResponse.json(
      { error: '获取部署日志失败' },
      { status: 500 }
    );
  }
} 