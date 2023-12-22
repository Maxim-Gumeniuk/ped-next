'use server'

import axios from 'axios';

import { ENDPOINTS } from '@/types/api/endpoints';
import { APISTATUSES } from '@/types/api/statuses';
import { cookies } from 'next/headers';


export const serverSideAxiosInstance = axios.create({
    baseURL: process.env.SERVER_URL!,
    withCredentials: true
});

serverSideAxiosInstance.interceptors.request.use(async (config) => {
    const cookieParser =  cookies();
    const accessToken = cookieParser.get('accesToken')

    config.headers['Authorization'] = `Bearer ${accessToken?.value}`;

    return config;
}, (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
});


serverSideAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        if (error.response && error.response.status === APISTATUSES.UNAUTHORIZED) {

        const response = await serverSideAxiosInstance.post(ENDPOINTS.REFRESH);

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
