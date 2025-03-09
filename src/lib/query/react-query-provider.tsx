"use client"

import getQueryClient from "./get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";


export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
    const client = getQueryClient();
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}