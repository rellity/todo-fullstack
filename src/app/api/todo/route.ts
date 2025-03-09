import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
            where: { deleted: false },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(todos, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
