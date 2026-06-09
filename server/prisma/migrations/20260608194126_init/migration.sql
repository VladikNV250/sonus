-- CreateTable
CREATE TABLE "Preset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PresetString" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "presetId" INTEGER NOT NULL,
    "stringNumber" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "octave" INTEGER NOT NULL,
    CONSTRAINT "PresetString_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "Preset" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
