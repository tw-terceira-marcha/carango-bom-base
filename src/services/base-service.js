const baseFetch = (route = "", body = "", method) => {
    return fetch('https://carango-bom-api.herokuapp.com/' + route,
    {
        method,
        body: JSON.stringify(body)
    })
    .then(r => r.json())
}

export const basePost = (route = "", body = "") => {
    const method = "POST"
    return baseFetch(route, body, method)
}

export const baseGet = (route = "", body = "") => {
    const method = "GET"
    return baseFetch(route, body, method)
}

export const baseDelete = (route = "", body = "") => {
    const method = "DELETE"
    return baseFetch(route, body, method)
}