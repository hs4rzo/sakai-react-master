'use server';

import { IInstrument } from '@/types/instrument';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getInstruments() {
    const labs = await prisma.$queryRaw`SELECT * FROM mas_instruments`;
    return labs as IInstrument[];
}