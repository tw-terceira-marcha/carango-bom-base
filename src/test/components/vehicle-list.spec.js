import React from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, within } from '@testing-library/react';

import VehicleList from '../../components/container/vehicle-list';

const list = require('./../mock/vehicle-list.json');
const error = require('./../mock/vehicle-error.json');

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
    const expectedItems = list.body;
    expect(listItems).toHaveLength(expectedItems.length);

    listItems.forEach((item, index) => {

        const { getByText } = within(item);
        const { modelo } = expectedItems[index];

        expect(getByText(modelo)).toBeInTheDocument();
    });

    server.close();
});

test('loads an empty list of vehicle cards', async () => {

    const server = setupGetServer(error);

    render(<VehicleList />);

    const item = screen.queryByTestId('vehicle-card');
    expect(item).toBeNull();

    // check the dialog component

    server.close();
});