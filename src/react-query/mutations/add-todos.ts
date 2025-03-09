import { Todo } from "@/lib/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useAddTodos = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn: async (todo: Partial<Todo>) => {
            const response = await fetch("/api/todo/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            });
            if (!response.ok) {
                throw new Error("An error occurred while adding the todo");
            }
            return response.json();
        },
        onSuccess: () => {
            toast.success("Todo added successfully")
        },
        onError: () => {
            toast.error("something went wrong")
        },
        onSettled: () => queryclient.invalidateQueries({ queryKey: ["todos"] })
    })
}