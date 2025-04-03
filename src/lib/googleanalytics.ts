"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useGoogleAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.gtag("config", "G-WP93BPZC3T", {
                page_path: pathname,
            });
        }
    }, [pathname]);
}

export function trackEvent(action: string, category: string, label: string) {
    if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
        });
    }
}

// This is a workaround for TypeScript to recognize the gtag function on the window object
declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
    }
}
