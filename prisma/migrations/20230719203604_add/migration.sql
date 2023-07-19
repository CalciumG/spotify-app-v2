-- CreateTable
CREATE TABLE "TopSongs" (
    "id" SERIAL NOT NULL,
    "songId" TEXT NOT NULL,
    "songName" TEXT NOT NULL,
    "spotifyUserName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopSongs_pkey" PRIMARY KEY ("id")
);
