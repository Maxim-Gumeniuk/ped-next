"use client";

import { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { authApi } from "@/api/auth";
import { RegistrInitialValue } from "@/types/auth/registration/registration";
import { AuthForm } from "@/ui-bricks/auth/form";

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
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values: RegistrInitialValue) => {
            try {
                await authApi.registration({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });
            } catch (e) {
                console.log(e);
            }
        },
    });

    const { values, handleChange, errors, touched } = formik;

    const inputArray = useMemo(() => {
        return [
            {
                type: "name",
                placeholder: "TYPE YOUR NAME",
                value: values.name,
                change: handleChange,
                errors: errors.name,
                touched: touched.name,
            },
            {
                type: "email",
                placeholder: "EMAIL",
                change: handleChange,
                value: values.email,
                errors: errors.email,
                touched: touched.email,
            },
            {
                type: "password",
                placeholder: "PASSWORD",
                change: handleChange,
                value: values.password,
                errors: errors.password,
                touched: touched.password,
            },
        ];
    }, [
        errors.email,
        errors.name,
        errors.password,
        handleChange,
        touched.email,
        touched.name,
        touched.password,
        values.email,
        values.name,
        values.password,
    ]);
    return <AuthForm inputArray={inputArray} onSubmit={formik.submitForm} />;
}
