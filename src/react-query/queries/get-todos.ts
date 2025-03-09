import { Todo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query"

export const useGetTodos = () => {
    return useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            const response = await fetch("/api/todo");
            if (!response.ok) {
                throw new Error("An error occurred while fetching the data");
            }
            return response.json();
        },

    })
}