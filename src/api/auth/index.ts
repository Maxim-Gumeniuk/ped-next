import { ENDPOINTS } from "@/types/api/endpoints";
import { Icredentials } from "@/types/api/credentials";

import { appFetchingInstance } from "../baseUrl"
import { enqueueSnackbar } from "notistack";

const registration = async (param: Icredentials) => {
    try {
        const { name, email, password } = param;
        await appFetchingInstance.post(ENDPOINTS.REGISTRATION, {
            name,
            email,
            password
        })
    } catch(error: any) {
        console.log(error.response.data);
        enqueueSnackbar(error.response.data, { variant: 'warning' });
        throw new Error();
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

    } catch(e: any) {
        if (e.response.data.message) {
            enqueueSnackbar(e.response.data.message, { variant: 'info' });
        }
        
        enqueueSnackbar(e.response.data.errors.error, { variant: 'warning' });
        throw new Error();
    }
}

export const authApi = {
    registration,
    authorization
}
