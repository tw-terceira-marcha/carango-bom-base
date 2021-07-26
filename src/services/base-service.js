const baseFetch = async (route = '', body, method) => {
    let args = { method };

    if (body) {
        args.body = JSON.stringify(body);
    }

    const response = await fetch('https://carango-bom-api.herokuapp.com/' + route, args);

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
