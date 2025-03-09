import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useRenameTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, title }: { id: string, title: string }) => {
            const response = await fetch(`/api/todo/rename/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, title })
            });
            if (!response.ok) {
                throw new Error("An error occurred while renaming the data");
            }
        },
        onSuccess: () => {
            toast.success("Todo renamed successfully")
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })
}