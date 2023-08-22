-- CreateTable
CREATE TABLE "Testings" (
    "id" TEXT NOT NULL,
    "up" JSONB NOT NULL,
    "down" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "govId" TEXT,

    CONSTRAINT "Testings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Govs" (
    "id" TEXT NOT NULL,
    "gov_name" TEXT NOT NULL,
    "gov_place" TEXT NOT NULL,
    "place_description" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "fiber_type" TEXT NOT NULL,
    "fiber_len_UP" INTEGER NOT NULL,
    "fiber_len_DOWN" INTEGER NOT NULL,
    "end_line_UP" INTEGER NOT NULL,
    "end_line_DOWN" INTEGER NOT NULL,

    CONSTRAINT "Govs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testings" ADD CONSTRAINT "Testings_govId_fkey" FOREIGN KEY ("govId") REFERENCES "Govs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
