"use client";

import { FC, PropsWithChildren, useContext, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/types/routes";
import { isAuth } from "@/utils/isAuth";

export const AuthChecker: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    const isAuthCheck = isAuth();

    useLayoutEffect(() => {
        if (!isAuthCheck) {
            router.push(ROUTES.AUTHORIZATION);

            return;
        }
    }, [isAuthCheck, router]);
    return <>{children}</>;
};
