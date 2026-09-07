import 'dotenv/config';
import { prisma } from '../api/_lib/prisma.js';

async function main() {
  console.log('Applying migration for comments v2 (replies, likes, edit)...');

  // Comment: add edited column and updatedAt
  await prisma.$executeRawUnsafe(`ALTER TABLE "Comment" ADD COLUMN IF NOT EXISTS "edited" BOOLEAN NOT NULL DEFAULT false;`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "Comment" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now();`);

  // Create Reply table
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Reply" (
      "id"        SERIAL PRIMARY KEY,
      "content"   TEXT NOT NULL,
      "edited"    BOOLEAN NOT NULL DEFAULT false,
      "commentId" INTEGER NOT NULL REFERENCES "Comment"("id") ON DELETE CASCADE,
      "userId"    INTEGER NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Reply_commentId_idx" ON "Reply"("commentId");`);

  // Create CommentLike table
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CommentLike" (
      "id"        SERIAL PRIMARY KEY,
      "commentId" INTEGER NOT NULL REFERENCES "Comment"("id") ON DELETE CASCADE,
      "userId"    INTEGER NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
      UNIQUE("commentId", "userId")
    );
  `);

  // Create ReplyLike table
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ReplyLike" (
      "id"      SERIAL PRIMARY KEY,
      "replyId" INTEGER NOT NULL REFERENCES "Reply"("id") ON DELETE CASCADE,
      "userId"  INTEGER NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
      UNIQUE("replyId", "userId")
    );
  `);

  console.log('Migration applied successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
