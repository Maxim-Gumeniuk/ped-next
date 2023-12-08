"use client";

import { useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { authApi } from "@/api/auth";
import { RegistrInitialValue } from "@/types/auth/registration/registration";
import { AuthForm } from "@/ui-bricks/auth/form";
import { useRouter } from "next/navigation";
import { ENDPOINTS } from "@/types/api/endpoints";

const initialValues: RegistrInitialValue = {
    name: "",
    email: "",
    password: "",
};

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "too short name!")
        .max(30, "too long name!")
        .required("required"),
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required").min(6, "too short password!"),
});

export default function Page() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: RegistrInitialValue) => {
            try {
                setLoading(true);
                await authApi.registration({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });

                router.push(ENDPOINTS.ACTIVATION);
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
                type: "name",
                placeholder: "TYPE YOUR NAME",
                ...getFieldProps("name"),
                errors: errors.name,
                touched: touched.name,
            },
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
    }, [
        errors.email,
        errors.name,
        errors.password,
        getFieldProps,
        touched.email,
        touched.name,
        touched.password,
    ]);
    return (
        <AuthForm
            inputArray={inputArray}
            onSubmit={formik.submitForm}
            isLoading={isLoading}
        />
    );
}
