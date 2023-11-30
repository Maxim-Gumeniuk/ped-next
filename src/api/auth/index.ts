import { ENDPOINTS } from "@/types/api/endpoints";
import { Icredentials } from "@/types/api/credentials";

import { appFetchingInstance } from "../baseUrl"

const registration = async (param: Icredentials) => {
    try {
        const { name, email, password } = param;
        await appFetchingInstance.post(ENDPOINTS.REGISTRATION, {
            name,
            email,
            password
        })
    } catch(e) {
        console.log(e);
        
    }
}

export const authApi = {
    registration
}
