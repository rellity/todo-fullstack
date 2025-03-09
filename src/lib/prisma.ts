import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
    const result = await next(params)

    if (params.model === 'Todo') {
        if (Array.isArray(result)) {
            return result.map(todo => ({
                ...todo,
                description: todo.description === null ? '' : todo.description
            }))
        } else if (result && typeof result === 'object') {
            return {
                ...result,
                description: result.description === null ? '' : result.description
            }
        }
    }

    return result
})