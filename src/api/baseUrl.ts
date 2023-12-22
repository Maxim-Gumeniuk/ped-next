import axios from 'axios';

import { ENDPOINTS } from '@/types/api/endpoints';
import { APISTATUSES } from '@/types/api/statuses';

export const appFetchingInstance = axios.create({
    baseURL: process.env.SERVER_URL!,
    withCredentials: true
});


appFetchingInstance.interceptors.request.use(async (config) => {

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');

        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
});

appFetchingInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        if (error.response && error.response.status === APISTATUSES.UNAUTHORIZED) {

        const response = await appFetchingInstance.post(ENDPOINTS.REFRESH);

        if(!response.data) {
            console.error('Unauthorized access. Redirecting to login.');
            window.location.href = ENDPOINTS.AUTHORIZATION;
        }

        const { accessToken }  = response.data;

        localStorage.setItem('accesToken', accessToken)
    }

    return Promise.reject(error);
    }
);
