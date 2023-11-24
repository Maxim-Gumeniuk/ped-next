import { AuthForm } from "@/ui-bricks/auth/form";

export default function Page() {
    const inputArray = [
        {
            type: "email",
            placeholder: "EMAIL",
        },
        {
            type: "password",
            placeholder: "PASSWORD",
        },
    ];

    return <AuthForm inputArray={inputArray} />;
}
