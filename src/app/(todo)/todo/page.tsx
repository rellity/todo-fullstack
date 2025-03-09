import { Modal } from "@/modules/shared/ui-modal"
import TodoList from "@/modules/todo/todo-list"
import { Hammer, Info } from "lucide-react"

export default function TodoPage() {
    return (
        <main className="container mx-auto p-4 max-w-md">
            <div className="text-2xl font-bold text-center mb-6">
                <Hammer className="h-8 w-8 inline-block" /> rell&apos;s todo
            </div>
            <TodoList />

            <Modal title="Information" triggerText={<Info className="h-4 w-4" />} triggerClassName=" absolute bottom-3 right-4" triggerVariant="outline">
                <p>A simple todo web app.</p>
                <p className="mt-2 text-muted-foreground">by: Zachari Iligan</p>
                <p>stack: react, nextjs, postgresql, prisma, tailwindcss</p>
            </Modal>
        </main>
    )
}

