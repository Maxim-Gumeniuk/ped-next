"use client";

import { AUTHLINKS } from "@/types/auth/registration/links";
import { ROUTES } from "@/types/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();

    const [activate, setActivated] = useState<boolean>(false);

    const handleActivate = () => {
        setActivated(true);
    };

    useEffect(() => {
        if (activate) {
            router.push(ROUTES.AUTHORIZATION);
        }
    }, [activate, router]);

    return (
        <Link
            target="_blank"
            href={AUTHLINKS.ACTIVATIONBOT}
            onClick={handleActivate}
            className="flex justify-center items-center min-h-screen uppercase text-lg"
        >
            Click to activate your account
        </Link>
    );
}
