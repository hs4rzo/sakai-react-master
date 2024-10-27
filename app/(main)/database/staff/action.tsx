'use server';

import { IUserModel } from '@/types/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


export async function getUsers() {
    const users = await prisma.$queryRaw`SELECT * FROM view_get_users where user_id <> 9999`;

    return users as IUserModel[];
}