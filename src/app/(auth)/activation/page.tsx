import { AUTHLINKS } from "@/types/auth/links";
import Link from "next/link";

export default function Page() {
    return (
        <Link
            href={AUTHLINKS.ACTIVATIONBOT}
            className="flex justify-center items-center min-h-screen uppercase text-lg"
        >
            Click to activate your account
        </Link>
    );
}
