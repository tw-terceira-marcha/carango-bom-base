import { baseGet } from "../base-service";
const route = "vehicles/"
const VehicleService = {
  getList() {
    return baseGet(route)
  },
};

export default VehicleService;