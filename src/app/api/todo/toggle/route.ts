import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    try {
        const { id } = await req.json();
        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) return NextResponse.json({ message: 'Todo not found' }, { status: 404 });

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { completed: !todo.completed },
        });

        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
