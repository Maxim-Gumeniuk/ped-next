"use client";

import { mainContext } from "@/context/main";
import { IUser } from "@/types/user";
import { SnackbarProvider } from "notistack";
import { ReactNode, createContext, useContext, useMemo } from "react";

type Props = {
    children: ReactNode;
};

export function Providers({ children }: Props) {
    const user = useMemo(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("user")!) || null;
        }
    }, []);

    return (
        <mainContext.Provider value={{ user }}>
            <SnackbarProvider autoHideDuration={1500}>
                {children}
            </SnackbarProvider>
        </mainContext.Provider>
    );
}
