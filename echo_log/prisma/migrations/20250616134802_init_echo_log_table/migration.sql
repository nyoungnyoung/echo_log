-- CreateTable
CREATE TABLE "echo_log" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "echo_log_pkey" PRIMARY KEY ("id")
);
