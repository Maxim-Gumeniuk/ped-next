import axios from 'axios';

import { ENDPOINTS } from '@/types/api/endpoints';
import { APISTATUSES } from '@/types/api/statuses';

export const appFetchingInstance = axios.create({
    baseURL: 'http://localhost:3210'
});

appFetchingInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

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
