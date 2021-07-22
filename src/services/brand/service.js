import {basePost, baseGet, baseDelete} from '../base-service'
const route = "brand/"

const BrandService = {
  create(brand) {
    return basePost(route, brand);
  },

  update(brand) {
    return basePost(route, brand);
  },

  getById(id) {
    const routeById = route + id;
    return baseGet(routeById);
  },

  getList() {
    return baseGet(route);
  },

  deleteById(id) {
    const routeDelete = route + id;
    return baseDelete(routeDelete);
  }
};

export default BrandService;