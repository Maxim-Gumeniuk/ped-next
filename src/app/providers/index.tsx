"use client";

import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function Providers({ children }: Props) {
    return (
        <SnackbarProvider autoHideDuration={1500}>{children}</SnackbarProvider>
    );
}
