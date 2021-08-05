import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import VehicleList from '../../pages/vehicle-list';
import { formatCurrency } from '../../utils/formatter';

// Don't EVER change this json if you care about your sanity
const mockVehicleList = require('../mock/vehicle-list.json');

jest.mock('../../services/vehicle/service.js', () => {
    return {
        __esModule: true,
        A: true,
        default: {
            async getList() {
                return {
                    ok: true,
                    status: 200,
                    data: mockVehicleList
                };
            },
            async deleteById(id) {
                expect(id).toBe(mockVehicleList[0].id);
                return {
                    ok: true,
                    status: 200,
                    data: mockVehicleList[0]
                };
            }
        },
    };
});

describe(
    'Test vehicle list',
    () => {
        test('verify if vehicle list is being loaded', () => act(async () => {
            render(<VehicleList></VehicleList>);
            await screen.findByText(mockVehicleList[0].model);

            const listRows = screen.getAllByRole('row');
            expect(listRows).toHaveLength(
                mockVehicleList.length + 1 // Additional header row.
            );

            mockVehicleList.forEach(async item => {
                const modelElement = screen.getByText(item.model);
                const yearElement = screen.getByText(item.year);
                expect(modelElement).toBeInTheDocument();
                expect(yearElement).toBeInTheDocument();
            });
        }));

        test('verify if delete action is working properly', () => act(async () => {
            render(<VehicleList/>);

            const deleteButton = await screen.findByTestId('default-list-delete-button');
            expect(deleteButton).toBeVisible();
            expect(deleteButton).toBeDisabled();

            const element = await screen.findByText(mockVehicleList[0].model);
            fireEvent.click(element);

            expect(deleteButton).not.toBeDisabled();

            fireEvent.click(deleteButton);
        }));
    }
);