'use server';

import { ICertAddress } from '@/types/certAddress';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getCertAddress() {
    const labs = await prisma.$queryRaw`SELECT * FROM mas_certified`;
    return labs as ICertAddress[];
}