import { baseGet } from '../base-service';
const route = 'veiculos/';
const VehicleService = {
    async getList() {
        const { status, body, ok } = await baseGet(route);
        if (ok) {
            const data = await body.json();
            return { ok, status, data };
        } else {
            return { ok, status, data: [] };
        }
    },
};

export default VehicleService;