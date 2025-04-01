-- CreateTable
CREATE TABLE "ZabbixInstance" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "version" TEXT,
    "accessUrl" TEXT,
    "username" TEXT,
    "password" TEXT,
    "uptime" TEXT,
    "lastBackup" TIMESTAMP(3),
    "lastConfigBackup" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ZabbixInstance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ZabbixMetric" (
    "id" TEXT NOT NULL,
    "instanceId" TEXT NOT NULL,
    "metricType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZabbixMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeploymentLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "instanceId" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "logs" TEXT[],
    "errorMessage" TEXT,

    CONSTRAINT "DeploymentLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ZabbixMetric_instanceId_timestamp_idx" ON "ZabbixMetric"("instanceId", "timestamp");

-- AddForeignKey
ALTER TABLE "ZabbixMetric" ADD CONSTRAINT "ZabbixMetric_instanceId_fkey" FOREIGN KEY ("instanceId") REFERENCES "ZabbixInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
