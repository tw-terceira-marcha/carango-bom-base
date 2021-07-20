import React, { useEffect, useState } from 'react';
import VehicleService from '../../../services/vehicle/service';
import VehicleCard from '../../ui/vehicle-card';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => loadVehicles(), []);

    const loadVehicles = async () => {
        const list = await VehicleService.getList();
        setVehicles(list);
    }

    return (
        <>
            {
                vehicles.map(item => <VehicleCard data={item}></VehicleCard>)
            }
        </>
    );

};

export default VehicleList;