import React, { useEffect, useState } from 'react';
import VehicleService from '../../../services/vehicle/service';
import VehicleCard from '../../ui/vehicle-card';
import './styles.scss';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => loadVehicles(), []);

    const loadVehicles = async () => {
        const list = await VehicleService.getList();
        setVehicles(list);
    }

    return (
        <section className='list-container'>
            {
                vehicles.map(item => <VehicleCard className="list-element" key={item.id} data={item}></VehicleCard>)
            }
        </section>
    );

};

export default VehicleList;