import React from 'react'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, within } from '@testing-library/react';

import VehicleList from '../../components/container/vehicle-list';

const list = require('./../mock/vehicle-list.json');

const server = setupServer(
    rest.get('https://carango-bom-api.herokuapp.com/veiculos', (req, res, ctx) => {
        return res(ctx.json(list))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays a list of cards', async () => {
    render(<VehicleList />);

    const listItems = await screen.findAllByTestId('vehicle-card');
    expect(listItems).toHaveLength(3);

    listItems.forEach((item, index) => {

        const { getByText } = within(item);
        const { modelo } = list[index];

        expect(getByText(modelo)).toBeInTheDocument();
    });
});