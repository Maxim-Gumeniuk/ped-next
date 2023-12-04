"use client";

import { authApi } from "@/api/auth";
import { IAuthorization } from "@/types/auth/authorization";
import { ROUTES } from "@/types/routes";
import { AuthForm } from "@/ui-bricks/auth/form";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: IAuthorization) => {
            const { email, password } = values;
            try {
                setLoading(true);

                await authApi.authorization({
                    email,
                    password,
                });
                router.push(ROUTES.MAIN);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        },
    });

    const { getFieldProps, errors, touched } = formik;

    const inputArray = [
        {
            type: "email",
            placeholder: "EMAIL",
            ...getFieldProps("email"),
            errors: errors.email,
            touched: touched.email,
        },
        {
            type: "password",
            placeholder: "PASSWORD",
            ...getFieldProps("password"),
            errors: errors.password,
            touched: touched.password,
        },
    ];

    return (
        <AuthForm
            inputArray={inputArray}
            onSubmit={formik.submitForm}
            isLoading={isLoading}
            isAuth={true}
            buttonText="Login"
        />
    );
}
