"use client";

import { authApi } from "@/api/auth";
import { IAuthorization } from "@/types/auth/authorization";
import { ROUTES } from "@/types/routes";
import { AuthForm } from "@/ui-bricks/auth/form";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import * as Yup from "yup";

const initialValues: IAuthorization = {
    email: "",
    password: "",
};

const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required").min(6, "too short password!"),
});

export default function Page() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prev) => {
            return !prev;
        });
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: IAuthorization) => {
            const { email, password } = values;
            try {
                setLoading(true);

                const user = await authApi.authorization({
                    email,
                    password,
                });

                localStorage.setItem("user", JSON.stringify(user));

                router.push(ROUTES.MAIN);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },
    });

    const { getFieldProps, errors, touched } = formik;

    const inputArray = useMemo(() => {
        return [
            {
                type: "email",
                placeholder: "EMAIL",
                ...getFieldProps("email"),
                errors: errors.email,
                touched: touched.email,
            },
            {
                type: showPassword ? "text" : "password",
                password: true,
                placeholder: "PASSWORD",
                ...getFieldProps("password"),
                errors: errors.password,
                touched: touched.password,
            },
        ];
    }, [
        errors.email,
        errors.password,
        getFieldProps,
        showPassword,
        touched.email,
        touched.password,
    ]);

    return (
        <AuthForm
            inputArray={inputArray}
            onSubmit={formik.submitForm}
            isLoading={isLoading}
            isAuth={true}
            buttonText="Login"
            handleShowPassword={handleShowPassword}
        />
    );
}
