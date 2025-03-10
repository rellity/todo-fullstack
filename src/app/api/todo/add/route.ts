import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';



export async function POST(req: Request) {
    try {
        const { title, description } = await req.json();
        // equivalent to : INSERT INTO todo (title, description, completed) VALUES (title, description, false)
        const newTodo = await prisma.todo.create({
            data: { title, description, completed: false },
        });

        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
