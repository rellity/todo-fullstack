"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddTodo } from "./add-todo"
import { TodoItem } from "./todo-item"
import { useGetTodos } from "@/react-query/queries/get-todos"
import { Todo } from "@/lib/types"
import { useAddTodos } from "@/react-query/mutations/add-todos"
import { Loader2 } from "lucide-react"
import { useDeleteTodos } from "@/react-query/mutations/delete-todos"
import { useToggleTodo } from "@/react-query/mutations/toggle-todo"
import { useRenameTodo } from "@/react-query/mutations/rename-todo"



export default function TodoList() {
    const { data: todos, isPending: todosfetching, refetch } = useGetTodos();
    const addtodo = useAddTodos();
    const deletetodo = useDeleteTodos();
    const togggletodo = useToggleTodo();
    const renametodo = useRenameTodo();

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const addTodo = (text: string) => {
        if (text.trim()) {
            const newTodo: Partial<Todo> = {
                id: uuidv4(),
                title: text,
                description: "",
                completed: false,
            }
            addtodo.mutate(newTodo)
        }
    }

    const toggleTodo = (id: string) => {
        togggletodo.mutate(id)
        refetch()
    }

    const deleteTodo = (id: string) => {
        deletetodo.mutate(id)
        refetch()
    }

    const renameTodo = ({ id, title }: { id: string, title: string }) => {
        renametodo.mutate({ id, title })
        refetch()
    }

    const filteredTodos = todos?.filter((todo) => {
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
        return true
    })

    const activeTodosCount = todos?.filter((todo) => !todo.completed).length

    return (
        <div className="bg-card rounded-lg shadow-lg p-6">
            <AddTodo onAdd={addTodo} adding={addtodo.status} />

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Tabs defaultValue="all" className="mt-6" onValueChange={(value: any) => setFilter(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    {todosfetching ?
                        <div className="flex justify-center items-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div> : todos && filteredTodos?.length as number > 0 ? (
                            <ul className="space-y-2">
                                {filteredTodos?.map((todo) => (
                                    <TodoItem key={todo.id} todoitem={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={renameTodo} />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-muted-foreground py-4">No todos found</p>
                        )}
                </TabsContent>

                <TabsContent value="active" className="mt-4">
                    {todosfetching ?
                        <div className="flex justify-center items-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div> : todos && filteredTodos?.length as number > 0 ? (
                            <ul className="space-y-2">
                                {filteredTodos?.map((todo) => (
                                    <TodoItem key={todo.id} todoitem={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={renameTodo} />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-muted-foreground py-4">No active todos</p>
                        )}
                </TabsContent>

                <TabsContent value="completed" className="mt-4">
                    {todosfetching ?
                        <div className="flex justify-center items-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div> : todos && filteredTodos?.length as number > 0 ? (
                            <ul className="space-y-2">
                                {filteredTodos?.map((todo) => (
                                    <TodoItem key={todo.id} todoitem={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={renameTodo} />
                                ))}
                            </ul>
                        ) : filteredTodos?.length === 0 && !todosfetching && (
                            <p className="text-center text-muted-foreground py-4">No completed todos</p>
                        )}
                </TabsContent>
            </Tabs>

            <div className="mt-4 text-sm text-muted-foreground">
                {activeTodosCount} {activeTodosCount === 1 ? "item" : "items"} left
            </div>
        </div>
    )
}

