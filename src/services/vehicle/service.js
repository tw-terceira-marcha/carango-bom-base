import { baseDelete, baseGet, basePost, basePut } from '../base-service';
const route = 'vehicles';
const VehicleService = {
    async create(vehicle) {
        const response = await basePost(route, vehicle);
        const { status, ok } = response;
        const body = await response.json();

        if (ok) {
            const data = body;
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },

    async update(vehicle) {
        const response = await basePut(route + vehicle.id, vehicle);
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

export default VehicleService;