import axios from 'axios'
import qs from 'qs'
import auth from 'api/auth'

import {
    Indicator
} from 'mint-ui';
const instance = axios.create({
    baseURL: '/lixun',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
    }
});
instance.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    //404等问题可以在这里处理
    console.log(error.response);
    auth(error.response.data.code, error.response.data.message);
    return Promise.reject(error);
});
export default instance