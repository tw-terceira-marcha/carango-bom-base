const StorageService = {
    set(key,value){
        localStorage.setItem(key, value);
    },
    get(key){
        return localStorage.getItem(key);
    },
    delete(key){
        localStorage.removeItem(key);
    },
    tokenKey: 'token'
};

export default StorageService;