import { baseGet } from '../base-service';
const route = 'veiculos/';
const VehicleService = {
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
};

export default VehicleService;