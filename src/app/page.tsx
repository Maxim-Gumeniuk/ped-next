"use client";

import { useContext } from "react";
import { mainContext } from "./providers/main";

export default function Home() {
    const context = useContext(mainContext);

    return (
        <h1 className="flex flex-column justify-center items-center h-screen">
            hello
        </h1>
    );
}
