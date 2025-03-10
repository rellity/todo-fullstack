import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        // equivalent to : UPDATE todo SET deleted = true WHERE id = id
        await prisma.todo.update({
            where: { id },
            data: { deleted: true },
        });

        return NextResponse.json({ message: 'Todo soft deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}