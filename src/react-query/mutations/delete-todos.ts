import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteTodos = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/todo/delete/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            if (!response.ok) {
                throw new Error("An error occurred while deleting the data");
            }
        },
        onSuccess: () => {
            toast.success("Todo deleted successfully")
            queryclient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}