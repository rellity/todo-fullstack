import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
    try {
        const { id } = await req.json();

        // equivalent to : SELECT * FROM todo WHERE id = id
        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) return NextResponse.json({ message: 'Todo not found' }, { status: 404 });

        // equivalent to : UPDATE todo SET completed = !completed WHERE id = id
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { completed: !todo.completed },
        });

        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
