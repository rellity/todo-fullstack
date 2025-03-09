"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Todo } from "@/lib/types"



interface TodoModalProps {
    todo: Todo
    onSave: ({ id, title }: { id: string, title: string }) => void
    triggerText?: React.JSX.Element
    triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function TodoModal({ todo, onSave, triggerText }: TodoModalProps) {
    const [newTitle, setNewTitle] = useState(todo.title)
    const [open, setOpen] = useState(false)

    const handleSave = () => {
        onSave({
            id: todo.id,
            title: newTitle,
        })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerText}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Todo Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="title" className="text-sm font-medium">
                                Title
                            </Label>
                            <div className="flex gap-2">
                                {todo.completed && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                        Completed
                                    </Badge>
                                )}
                                {todo.deleted && (
                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                        <XCircle className="h-3.5 w-3.5 mr-1" />
                                        Deleted
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label className="text-sm font-medium">ID</Label>
                            <div className="p-2 mt-1 text-sm rounded-md bg-muted font-mono overflow-hidden text-ellipsis">
                                {todo.id}
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Status</Label>
                            <div className="p-2 mt-1 text-sm rounded-md bg-muted">
                                {todo.completed ? "Completed" : "Active"}
                                {todo.deleted ? " (Deleted)" : ""}
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

