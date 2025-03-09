import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        await prisma.todo.update({
            where: { id },
            data: { deleted: true },
        });

        return NextResponse.json({ message: 'Todo soft deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}