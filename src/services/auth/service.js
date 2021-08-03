import { basePost } from '../base-service';
const authRoute = 'auth';
const userRoute = 'users';

const AuthService = {
    async login(email, password) {
        const response = await basePost(
            authRoute,
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

    async register(name, email, password) {
        const response = await basePost(
            userRoute,
            {
                name,
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
    }
};

export default AuthService;
