"use client";

import Link from "next/dist/client/link";
import { FC, memo, useRef } from "react";

interface IinputArray {
    type: string;
    placeholder: string;
}

type Props = {
    inputArray: Array<IinputArray>;
};

export const AuthForm: FC<Props> = memo(({ inputArray }) => {
    const tabArray = [
        {
            name: "registration",
        },
        {
            name: "authorization",
        },
    ];
    return (
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
                                {inputArray.map(({ type, placeholder }) => (
                                    <input
                                        type={type}
                                        className="rounded-lg bg-grey p-4 placeholder-uppercase"
                                        placeholder={placeholder}
                                        key={type}
                                    />
                                ))}
                            </div>
                            <div className="text-right pr-3 cursor-pointer">
                                <span className="text-green">
                                    forget a password ?
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green p-4 rounded-lg flex justify-center items-cente uppercase cursor-pointer">
                        <div>registration</div>
                    </div>
                </div>
            </div>
        </div>
    );
});

AuthForm.displayName = "authForm";
