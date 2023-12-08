import { FC, Fragment, memo } from "react";

import { IinputArray } from "@/types/auth/registration";
import Link from "next/dist/client/link";

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
};

export const AuthForm: FC<Props> = memo(
    ({
        inputArray,
        onSubmit,
        isAuth = false,
        isLoading = false,
        buttonText = "registration",
    }) => (
        <div className="flex flex-col justify-center items-center min-h-screen gap-y-2.5">
            <div className="w-1/3">
                <div className="flex flex-col gap-y-5">
                    <div className="flex gap-x-8 text-xl uppercase justify-center">
                        {tabArray.map(({ name }) => (
                            <Link
                                href={`/${name}`}
                                className="cursor-pointer"
                                key={name}
                            >
                                {name}
                            </Link>
                        ))}
                    </div>
                    <div className="w-100 bg-lightGrey h-0.5" />
                    <div>
                        <div className="flex flex-col gap-y-5">
                            <div className="flex flex-col gap-y-4">
                                {inputArray.map((input) => {
                                    const { type, touched, errors } = input;
                                    return (
                                        <Fragment key={type}>
                                            <input
                                                id={type}
                                                className="rounded-lg bg-grey p-4 placeholder-uppercase"
                                                {...input}
                                            />
                                            {touched && errors && (
                                                <span className="text-red italic">
                                                    {errors}
                                                </span>
                                            )}
                                        </Fragment>
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
    )
);

AuthForm.displayName = "authForm";
