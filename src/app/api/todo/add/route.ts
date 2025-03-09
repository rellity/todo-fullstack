import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { title, description } = await req.json();
        const newTodo = await prisma.todo.create({
            data: { title, description, completed: false },
        });

        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
