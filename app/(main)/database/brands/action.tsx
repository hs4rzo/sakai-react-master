'use server';

import { IBrand } from '@/types/brand';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getBrands() {
    const labs = await prisma.$queryRaw`SELECT * FROM mas_brands`;
    return labs as IBrand[];
}