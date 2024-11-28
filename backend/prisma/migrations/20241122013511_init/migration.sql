-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "review" JSONB NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);
