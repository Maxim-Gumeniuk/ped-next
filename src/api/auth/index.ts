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

const authorization = async (param: Partial<Icredentials>) => {
    const { email, password } = param;

    try {
        const response = await appFetchingInstance.post(ENDPOINTS.AUTHORIZATION, {
            email,
            password
        })

        const { data } = response;

        localStorage.setItem('accesToken', data.accesToken);

    } catch(e) {
        console.error(e);
        throw new Error();
    }
}

export const authApi = {
    registration,
    authorization
}
