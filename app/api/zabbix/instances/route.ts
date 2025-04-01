import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// 验证创建实例的数据
const createInstanceSchema = z.object({
  name: z.string(),
  organization: z.string(),
  region: z.string(),
  mode: z.enum(['single', 'cluster', 'distributed']),
  version: z.string().optional(),
  accessUrl: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
});

// GET /api/zabbix/instances
export async function GET() {
  try {
    const instances = await prisma.zabbixInstance.findMany({
      include: {
        metrics: {
          where: {
            timestamp: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // 最近24小时
            }
          },
          orderBy: {
            timestamp: 'desc'
          }
        }
      }
    });
    return NextResponse.json(instances);
  } catch (error) {
    console.error('获取Zabbix实例列表失败:', error);
    return NextResponse.json(
      { error: '获取Zabbix实例列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/zabbix/instances
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createInstanceSchema.parse(body);

    const instance = await prisma.zabbixInstance.create({
      data: {
        ...validatedData,
        status: 'creating', // 初始状态
      }
    });

    return NextResponse.json(instance);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '无效的请求数据', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('创建Zabbix实例失败:', error);
    return NextResponse.json(
      { error: '创建Zabbix实例失败' },
      { status: 500 }
    );
  }
} 