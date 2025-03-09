import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export type QueryOpt<T> = Omit<UseQueryOptions<T, unknown, T, QueryKey>, 'initialData'>;

export type Todo = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    deleted: boolean;
}