'use server';

import { ILab } from '@/types/lab';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getLabs() {
    const labs = await prisma.$queryRaw`SELECT * FROM mas_labs`;
    return labs as ILab[];
}