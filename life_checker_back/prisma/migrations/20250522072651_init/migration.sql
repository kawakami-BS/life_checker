-- CreateTable
CREATE TABLE "use" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "todayDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadlineDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "use_pkey" PRIMARY KEY ("id")
);
