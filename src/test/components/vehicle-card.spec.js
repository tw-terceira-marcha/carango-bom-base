import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import VehicleCard from '../../components/ui/vehicle-card';

const vehicle = {
    id: 1, 
    marca: {
        id: 1,
        nome: "Ford"
    }, 
    modelo: 'Ka', 
    ano: 2019, 
    valor: 20000
};

test('loads and displays card', async () => {

    render(<VehicleCard data={vehicle} />)

    expect(screen.getByText(vehicle.marca.nome)).toBeVisible();
    expect(screen.getByText(vehicle.modelo)).toBeVisible();
    expect(screen.getByText(vehicle.ano)).toBeVisible();
    expect(screen.getByText('R$ 20.000,00')).toBeVisible();
})

