import { ENDPOINTS } from "@/types/api/endpoints";
import { Icredentials } from "@/types/api/credentials";

import { appFetchingInstance } from "../baseUrl"
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";

const registration = async (param: Icredentials) => {
    try {
        const { name, email, password } = param;
        await appFetchingInstance.post(ENDPOINTS.REGISTRATION, {
            name,
            email,
            password
        })
    } catch(error) {
        if (error instanceof AxiosError && error.response) {
            enqueueSnackbar(error.response.data, { variant: 'warning' });
            throw new Error();
        }
        console.log(error);
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
        
        return data.user;

    } catch(e) {
        if (e instanceof AxiosError && e.response) {
            enqueueSnackbar(e.response.data.errors.error, { variant: 'warning' });
            throw new Error();
        }

        console.log(e);
    }
}

export const authApi = {
    registration,
    authorization
}
