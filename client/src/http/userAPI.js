import {$host, $authHost} from './index';
import jwt_decode from 'jwt-decode';

export const Registration = async (login, password) => {
    const {data} = await $host.post('api/user/registration', {login, password, role: 'ADMIN'});

    return jwt_decode(data.token);
}

export const Login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password});

    return jwt_decode(data.token);
}

export const Check = async () => {
    const {data} = await $authHost.get('api/user/auth', {});

    return {data};
}