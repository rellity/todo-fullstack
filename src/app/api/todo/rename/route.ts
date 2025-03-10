import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function PATCH(req: Request) {
    try {
        const { id, title } = await req.json();

        if (!id || !title) {
            return NextResponse.json({ message: 'ID and title are required' }, { status: 400 });
        }


        // equivalent to : UPDATE todo SET title = title WHERE id = id
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { title },
        });

        return NextResponse.json(updatedTodo, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
