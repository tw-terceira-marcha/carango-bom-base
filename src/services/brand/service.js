import { basePost, baseGet, baseDelete, basePut } from '../base-service';
const route = 'brand/';

const BrandService = {
    async create(brand) {
        const { status, body, ok } = await basePost(route, brand);
        if (ok) {
            const data = await body.json();
            return { ok, status, data };
        } else {
            return { ok, status, data: null };
        }
    },

    async update(brand) {
        const { status, body, ok } = await basePut(route, brand);
        if (ok) {
            const data = await body.json();
            return { ok, status, data };
        } else {
            return { ok, status, data: null };
        }
    },

    async getById(id) {
        const routeById = route + id;
        const { status, body, ok } = await baseGet(routeById);
        if (ok) {
            const data = await body.json();
            return { ok, status, data };
        } else {
            return { ok, status, data: null };
        }
    },

    async getList() {
        const { status, body, ok } = await baseGet(route);
        if (ok) {
            const data = await body.json();
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },

    async deleteById(id) {
        const routeDelete = route + id;
        const { status, body, ok } = await baseDelete(routeDelete);
        if (ok) {
            const data = await body.json();
            return { ok, status, data };
        } else {
            return { ok, status, data: null };
        }
    }
};

export default BrandService;