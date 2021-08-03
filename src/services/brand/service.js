import { basePost, baseGet, baseDelete, basePut } from '../base-service';
const route = 'brands/';

const BrandService = {
    async create(brand) {
        const response = await basePost(route, brand);
        const { status, ok } = response;
        const body = await response.json();

        if (ok) {
            const data = body;
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },

    async update(brand) {
        const response = await basePut(route, brand);
        const { status, ok } = response;
        const body = await response.json();

        if (ok) {
            const data = body;
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },

    async getById(id) {
        const routeById = route + id;
        const response = await baseGet(routeById);
        const { status, ok } = response;
        const body = await response.json();

        if (ok) {
            const data = body;
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },

    async getList() {
        const response = await baseGet(route);
        const { status, ok } = response;
        const body = await response.json();

        if (ok) {
            const data = body;
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },

    async deleteById(id) {
        const routeDelete = route + id;
        const response = await baseDelete(routeDelete);
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

export default BrandService;