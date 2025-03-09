"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { Todo } from "@/lib/types"
import { TodoModal } from "./todo-modal"

type TodoProps = {
    todoitem: Todo
    onToggle: (id: string) => void
    onDelete: (id: string) => void
    onEdit: ({ id, title }: { id: string, title: string }) => void
}

export function TodoItem({ todoitem, onToggle, onDelete, onEdit }: TodoProps) {
    return (
        <li className="flex items-center justify-between p-3 bg-background rounded-md border">
            <div className="flex items-center gap-3">
                <Checkbox id={`todo-${todoitem.id}`} checked={todoitem.completed} onCheckedChange={() => onToggle(todoitem.id)} />
                <label htmlFor={`todo-${todoitem.id}`} className={`${todoitem.completed ? "line-through text-muted-foreground" : ""}`}>
                    {todoitem.title}
                </label>
            </div>
            <div className="flex gap-2">
                <TodoModal todo={todoitem} onSave={onEdit} triggerText={
                    <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                } />
                <Button variant="outline" size="icon" onClick={() => onDelete(todoitem.id)} aria-label="Delete todo">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </li>
    )
}

