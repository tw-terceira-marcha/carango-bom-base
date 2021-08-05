import React from 'react';
import { useHistory } from 'react-router-dom';
import DefaultList from '../../components/container/default-list';
import VehicleService from '../../services/vehicle/service';
import { formatCurrency } from '../../utils/formatter';

const columns = [
    { field: 'model', headerName: 'Veículo', width: 300 },
    {
        field: 'value',
        headerName: 'Valor',
        width: 300,
        renderCell: (GridCellParams) => formatCurrency(GridCellParams.value)
    },
    { field: 'year', headerName: 'Ano', width: 300 },
];

const VehicleList = () => {
    const history = useHistory();

    const updateVehicle = (vehicleId) => {
        history.push('/vehicle-update/' + vehicleId);
    };

    const deleteVehicle = async (vehicleId) => {
        await VehicleService.deleteById(vehicleId);
    };

    const addVehicle = async () => {
        history.push('/vehicle-register');
    };

    const loadVehicles = async () => {
        const response = await VehicleService.getList();
        return response.data;
    };

    return (
        <DefaultList
            columns={columns}
            load={loadVehicles}
            add={addVehicle}
            update={updateVehicle}
            remove={deleteVehicle}
        />
    );
};

export default VehicleList;