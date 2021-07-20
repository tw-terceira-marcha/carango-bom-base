const VehicleService = {
  getList() {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos')
      .then(r => r.json());
  },
};

export default VehicleService;