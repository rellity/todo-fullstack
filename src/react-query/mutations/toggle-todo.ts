import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useToggleTodo = () => {
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/todo/toggle/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            if (!response.ok) {
                throw new Error("An error occurred while toggling the data");
            }
        },
        onSuccess: () => {
            toast.success("Todo toggled successfully")
            queryclient.invalidateQueries({ queryKey: ["todos"] })
        }
    })
}