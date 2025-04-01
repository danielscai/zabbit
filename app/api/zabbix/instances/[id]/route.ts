import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/zabbix/instances/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const instance = await prisma.zabbixInstance.findUnique({
      where: { id: params.id },
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

    if (!instance) {
      return NextResponse.json(
        { error: '找不到指定的Zabbix实例' },
        { status: 404 }
      );
    }

    return NextResponse.json(instance);
  } catch (error) {
    console.error('获取Zabbix实例详情失败:', error);
    return NextResponse.json(
      { error: '获取Zabbix实例详情失败' },
      { status: 500 }
    );
  }
}

// PATCH /api/zabbix/instances/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const instance = await prisma.zabbixInstance.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(instance);
  } catch (error) {
    console.error('更新Zabbix实例失败:', error);
    return NextResponse.json(
      { error: '更新Zabbix实例失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/zabbix/instances/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.zabbixInstance.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除Zabbix实例失败:', error);
    return NextResponse.json(
      { error: '删除Zabbix实例失败' },
      { status: 500 }
    );
  }
} 