-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "userId" TEXT,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);
