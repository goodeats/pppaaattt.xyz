import { PrismaClient } from '@prisma/client';

// look to expand on this later
// https://github.com/goodeats/epic-pat-stack/blob/main/app/utils/db.server.ts

export const prisma = new PrismaClient();
