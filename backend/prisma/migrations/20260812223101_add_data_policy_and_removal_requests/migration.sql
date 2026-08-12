-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "dataPolicyAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dataPolicyAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "hiddenAt" TIMESTAMP(3),
ADD COLUMN     "isHidden" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ReportRemovalRequest" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReportRemovalRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReportRemovalRequest" ADD CONSTRAINT "ReportRemovalRequest_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
