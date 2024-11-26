-- CreateTable
CREATE TABLE "Ride" (
    "customerId" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "distance" INTEGER NOT NULL,
    "driver" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("customerId")
);
