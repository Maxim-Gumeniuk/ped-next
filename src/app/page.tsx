"use client";

import { mainContext } from "@/context/main";
import { useContext } from "react";

export default function Home() {
    const context = useContext(mainContext);

    return (
        <h1 className="flex flex-column justify-center items-center h-screen">
            hello
        </h1>
    );
}
