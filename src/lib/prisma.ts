import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient().$extends({
    result: {
        todo: {
            description: {
                needs: { description: true },
                compute(todo) {
                    return todo.description ?? "";
                }
            }
        }
    }
});