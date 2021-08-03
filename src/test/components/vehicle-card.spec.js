import React from 'react';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import VehicleCard from '../../components/ui/vehicle-card';

const vehicle = {
    id: 1,
    brand: {
        id: 1,
        name: 'Ford'
    },
    model: 'Ka',
    year: 2019,
    value: 20000
};

test('loads and displays card', async () => {

    render(<VehicleCard data={vehicle} />);

    expect(screen.getByText(vehicle.brand.name)).toBeVisible();
    expect(screen.getByText(vehicle.model)).toBeVisible();
    expect(screen.getByText(vehicle.year)).toBeVisible();
    expect(screen.getByText('R$ 20.000,00')).toBeVisible();
});
