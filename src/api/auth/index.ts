import { ENDPOINTS } from "@/types/api/endpoints";
import { appFetchingInstance } from "../baseUrl"

const registration = async (param: any) => {
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
