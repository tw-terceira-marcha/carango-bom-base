import { basePost } from '../base-service';
const route = 'auth';
const AuthService = {
    async login(email, password) {
        const response = await basePost(
            route, 
            {
                email,
                password
            }
        );
        const { status, ok } = response;
        const body = await response.json();

        if (ok) {
            const data = body;
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },
};

export default AuthService;