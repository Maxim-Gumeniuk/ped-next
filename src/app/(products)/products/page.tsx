"use server";

import { productsApi } from "@/api/products";

export default async function Page() {
    const products = await productsApi.getAllProducts();
    return <h1>evef</h1>;
}
