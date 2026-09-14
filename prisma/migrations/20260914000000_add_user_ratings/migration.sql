CREATE TABLE "UserRating" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "ehSerie" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "UserRating_userId_movieId_ehSerie_key" ON "UserRating"("userId", "movieId", "ehSerie");
CREATE INDEX "UserRating_userId_createdAt_idx" ON "UserRating"("userId", "createdAt");
CREATE INDEX "UserRating_movieId_ehSerie_idx" ON "UserRating"("movieId", "ehSerie");

ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
