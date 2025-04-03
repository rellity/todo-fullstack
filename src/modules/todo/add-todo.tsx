"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Plus } from "lucide-react"
import { trackEvent } from "@/lib/googleanalytics"

type AddTodoProps = {
    onAdd: (text: string) => void
    adding: string
}

export function AddTodo({ onAdd, adding }: AddTodoProps) {
    const [text, setText] = useState("")

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault()
        if (text.trim()) {
            onAdd(text)
            setText("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                type="text"
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1"
            />
            <Button variant="outline" type="submit" size="icon" disabled={adding === "pending"} onClick={
                () => trackEvent("click", "todo", "add_todo")}>
                {adding === "pending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                <span className="sr-only">Add todo</span>
            </Button>
        </form>
    )
}

