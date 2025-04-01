import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// 验证创建指标的数据
const createMetricSchema = z.object({
  metricType: z.enum(['cpu', 'memory']),
  value: z.number(),
});

// GET /api/zabbix/instances/[id]/metrics
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const metrics = await prisma.zabbixMetric.findMany({
      where: {
        instanceId: params.id,
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 最近24小时
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('获取监控指标失败:', error);
    return NextResponse.json(
      { error: '获取监控指标失败' },
      { status: 500 }
    );
  }
}

// POST /api/zabbix/instances/[id]/metrics
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = createMetricSchema.parse(body);

    const metric = await prisma.zabbixMetric.create({
      data: {
        ...validatedData,
        instanceId: params.id,
      }
    });

    return NextResponse.json(metric);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '无效的请求数据', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('创建监控指标失败:', error);
    return NextResponse.json(
      { error: '创建监控指标失败' },
      { status: 500 }
    );
  }
} 