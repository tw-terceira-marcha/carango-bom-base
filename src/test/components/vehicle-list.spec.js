import React from 'react'

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, within } from '@testing-library/react';
import { formatCurrency } from '../../utils/formatter';

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
    console.log('loads test');
    render(<VehicleList />);

    const listItems = screen.getAllByTestId('vehicle-card');
    expect(listItems).toHaveLength(3);

    const items = JSON.parse(list);

    listItems.forEach((item, index) => {

        const { getByText } = within(item);
        const { brand, model, year, value } = items[index];

        expect(getByText(brand)).toBeInTheDocument();
        expect(getByText(model)).toBeInTheDocument();
        expect(getByText(year)).toBeInTheDocument();
        expect(getByText(formatCurrency(value))).toBeInTheDocument();
    });
});