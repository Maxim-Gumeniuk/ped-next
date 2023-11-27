import axios from 'axios';

export const appFetchingInstance = axios.create({
    baseURL: 'http://localhost:3210'
});
