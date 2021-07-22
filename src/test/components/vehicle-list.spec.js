import React from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, within } from '@testing-library/react';

import VehicleList from '../../components/container/vehicle-list';

const list = require('./../mock/vehicle-list.json');

const setupGetServer = (response) => {
    const server = setupServer(
        rest.get('https://carango-bom-api.herokuapp.com/veiculos', (req, res, ctx) => {
            return res(ctx.json(response));
        })
    );
    server.listen();
    return server;
};

test('loads and displays a list of vehicle cards', async () => {

    const server = setupGetServer(list);

    render(<VehicleList />);

    const listItems = await screen.findAllByTestId('vehicle-card');
    expect(listItems).toHaveLength(list.length);

    listItems.forEach((item, index) => {

        const { getByText } = within(item);
        const { modelo } = list[index];

        expect(getByText(modelo)).toBeInTheDocument();
    });

    server.close();
});

test('loads an empty list of vehicle cards', async () => {
    render(<VehicleList />);

    const listItems = await screen.findAllByTestId('vehicle-card');
    expect(listItems).toHaveLength(list.length);

    listItems.forEach((item, index) => {

        const { getByText } = within(item);
        const { modelo } = list[index];

        expect(getByText(modelo)).toBeInTheDocument();
    });
});