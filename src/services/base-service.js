const baseFetch = (route = "", body = "", method) => {
    let args = { method };

    if (body !== null) {
        args.body = JSON.stringify(body);
    }

    return fetch('https://carango-bom-api.herokuapp.com/' + route, args)
        .then(r => r.json());
};

export const basePost = (route = "", body = "") => {
    const method = "POST";
    return baseFetch(route, body, method);
}

export const baseGet = (route = "") => {
    const method = "GET";
    return baseFetch(route, null, method);
}

export const baseDelete = (route = "", body = "") => {
    const method = "DELETE";
    return baseFetch(route, body, method);
}
