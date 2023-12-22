import { ENDPOINTS } from "@/types/api/endpoints"
import { serverSideAxiosInstance } from "../serverSideAxiosInstance";

const getAllProducts = async () => {
    try{
        const products = await serverSideAxiosInstance.get(ENDPOINTS.ALLPRODUCTS);

        const { data } = products;

        return data;
    } catch(e) {
        console.log(e);
    }
}

export const productsApi = {
    getAllProducts,
}
