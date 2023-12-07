"use client";

import { SnackbarProvider } from "notistack";
import { ReactNode, createContext } from "react";

export const mainContext = createContext<any | null>(null);

type Props = {
    children: ReactNode;
};

export function Providers({ children }: Props) {
    return (
        <mainContext.Provider value={{ user: null }}>
            <SnackbarProvider autoHideDuration={1500}>
                {children}
            </SnackbarProvider>
        </mainContext.Provider>
    );
}
