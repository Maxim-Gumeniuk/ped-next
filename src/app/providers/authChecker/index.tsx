"use client";

import { FC, PropsWithChildren, useContext, useLayoutEffect } from "react";
import { mainContext } from "../main";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/types/routes";

export const AuthChecker: FC<PropsWithChildren> = ({ children }) => {
    const context = useContext(mainContext);
    const router = useRouter();

    if (typeof window !== "undefined") {
        context.user = localStorage.getItem("user") || null;
    }

    useLayoutEffect(() => {
        if (!context.user) {
            router.push(ROUTES.AUTHORIZATION);
        }
    }, [context.user, router]);
    return <>{children}</>;
};
