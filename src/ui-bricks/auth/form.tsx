import { FC, Fragment, memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";

import EyeSvg from "@/pictures/1.svg";
import { IinputArray } from "@/types/auth/registration";
import Link from "next/dist/client/link";
import { usePathname, useRouter } from "next/navigation";

const tabArray = [
    {
        name: "registration",
    },
    {
        name: "authorization",
    },
];

type Props = {
    inputArray: Array<IinputArray>;
    onSubmit: () => void;
    isAuth?: boolean;
    isLoading?: boolean;
    buttonText?: string;
    handleShowPassword: () => void;
};

export const AuthForm: FC<Props> = memo(
    ({
        inputArray,
        onSubmit,
        isAuth = false,
        isLoading = false,
        buttonText = "registration",
        handleShowPassword,
    }) => {
        const path = usePathname();

        const isRouterActive = useCallback(
            (name: string) => {
                return path.slice(1) === name;
            },
            [path]
        );

        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-y-2.5">
                <div className="w-1/3">
                    <div className="flex flex-col gap-y-5">
                        <div className="flex gap-x-8 text-xl uppercase justify-center">
                            {tabArray.map(({ name }) => {
                                const linkClasses = [
                                    "cursor-pointer",
                                    isRouterActive(name) && "text-darkGreen",
                                ]
                                    .filter(Boolean)
                                    .join(" ");

                                return (
                                    <Link
                                        href={`/${name}`}
                                        className={linkClasses}
                                        key={name}
                                    >
                                        {name}
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="w-100 bg-lightGrey h-0.5" />
                        <div>
                            <div className="flex flex-col gap-y-5">
                                <div className="flex flex-col gap-y-4">
                                    {inputArray.map((input) => {
                                        const {
                                            type,
                                            touched,
                                            errors,
                                            password = false,
                                        } = input;

                                        return (
                                            <div
                                                key={type}
                                                className={
                                                    password
                                                        ? "relative min-h-100"
                                                        : ""
                                                }
                                            >
                                                <input
                                                    id={type}
                                                    className={`rounded-lg bg-grey p-4 placeholder-uppercase w-full`}
                                                    {...input}
                                                />
                                                {password && (
                                                    <Image
                                                        src={EyeSvg}
                                                        priority
                                                        width={14}
                                                        height={14}
                                                        alt="eye"
                                                        className="absolute bottom-1/2 right-5 translate-y-2/4 cursor-pointer"
                                                        onClick={
                                                            handleShowPassword
                                                        }
                                                    />
                                                )}
                                                {touched && errors && (
                                                    <span className="text-red italic">
                                                        {errors}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {isAuth && (
                                    <div className="text-right pr-3 cursor-pointer">
                                        <span className="text-green">
                                            forget a password ?
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className="bg-green p-4 rounded-lg flex justify-center items-cente uppercase cursor-pointer"
                            onClick={onSubmit}
                        >
                            {isLoading ? (
                                <div>loading...</div>
                            ) : (
                                <div>{buttonText}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

AuthForm.displayName = "authForm";
