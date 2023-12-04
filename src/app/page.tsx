"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    // useLayoutEffect(() => {
    //     router.push("/authorization");
    // }, []);

    return (
        <h1 className="flex flex-column justify-center items-center h-screen">
            hello my pet App
        </h1>
    );
}
