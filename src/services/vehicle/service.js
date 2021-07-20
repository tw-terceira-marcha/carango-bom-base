const VehicleService = {
  getList() {
    return fetch('https://carango-bom-api.herokuapp.com/vehicles')
      .then(r => r.json());
  },
};

export default VehicleService;