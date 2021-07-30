import StorageService from './storage';
const { tokenKey } = StorageService;
const baseFetch = async (route = '', body, method) => {

    let headers = {
        'Content-Type': 'application/json',
    };

    const token = StorageService.get(tokenKey);

    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let args = {
        crossDomain:true,
        method,
        headers
    };

    if (body) {
        args.body = JSON.stringify(body);
    }

    const response = await fetch('http://localhost:8080/' + route, args);

    return response;
};

export const basePost = async (route = '', body = '') => {
    const method = 'POST';
    return await baseFetch(route, body, method);
};

export const basePut = async (route = '', body = '') => {
    const method = 'PUT';
    return await baseFetch(route, body, method);
};

export const baseGet = async (route = '') => {
    const method = 'GET';
    return await baseFetch(route, null, method);
};

export const baseDelete = async (route = '', body = '') => {
    const method = 'DELETE';
    return await baseFetch(route, body, method);
};
