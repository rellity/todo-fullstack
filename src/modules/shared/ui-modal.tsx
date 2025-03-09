"use client"

import { ReactNode, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ModalProps {
    /** The title displayed in the modal header */
    title?: string
    /** The text for the trigger button */
    triggerText: React.JSX.Element
    /** The variant for the trigger button */
    triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    /** Additional classes for the trigger button */
    triggerClassName?: string
    /** The content of the modal */
    children: ReactNode
    /** The footer content, if not provided, no footer will be shown */
    footer?: ReactNode
    /** The maximum width class for the modal content */
    maxWidth?: "sm:max-w-sm" | "sm:max-w-md" | "sm:max-w-lg" | "sm:max-w-xl" | "sm:max-w-2xl" | "sm:max-w-3xl"
    /** Callback when the modal opens or closes */
    onOpenChange?: (open: boolean) => void
    /** Whether to show a close button in the footer */
    showCloseButton?: boolean
    /** Text for the close button */
    closeButtonText?: string
    /** Whether to disable the close button when an action is in progress */
    isLoading?: boolean,
}

export function Modal({
    title,
    triggerText,
    triggerVariant = "default",
    triggerClassName,
    children,
    footer,
    maxWidth = "sm:max-w-md",
    onOpenChange,
    showCloseButton = true,
    closeButtonText = "Close",
    isLoading = false,

}: ModalProps) {
    const [open, setOpen] = useState(false)

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        onOpenChange?.(newOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant={triggerVariant}
                    className={triggerClassName}
                    disabled={isLoading}
                >
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className={cn(maxWidth)}>
                {title && (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                )}
                <div className="py-4">{children}</div>
                {(footer || showCloseButton) && (
                    <DialogFooter className="flex items-center justify-end gap-2">
                        {footer}
                        {showCloseButton && (
                            <Button
                                variant="outline"
                                onClick={() => handleOpenChange(false)}
                                disabled={isLoading}
                            >
                                {closeButtonText}
                            </Button>
                        )}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
