/*
  Warnings:

  - You are about to drop the column `status` on the `Drink` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Drink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "unit" TEXT,
    "size" TEXT,
    "price" REAL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "minQuantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Drink" ("category", "createdAt", "id", "minQuantity", "name", "quantity", "updatedAt") SELECT "category", "createdAt", "id", "minQuantity", "name", "quantity", "updatedAt" FROM "Drink";
DROP TABLE "Drink";
ALTER TABLE "new_Drink" RENAME TO "Drink";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
