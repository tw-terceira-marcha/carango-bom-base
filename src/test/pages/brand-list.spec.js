import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, render, screen } from '@testing-library/react';
import BrandList from '../../pages/brand-list';

// Don't EVER change this json if you care about your sanity
const mockBrandList = require('../mock/brand-list.json');

jest.mock('../../services/brand/service.js', () => {
    return {
        __esModule: true,
        A: true,
        default: {
            async getList() {
                return {
                    ok: true,
                    status: 200,
                    data: mockBrandList
                };
            },
            async deleteById(id) {
                expect(id).toBe(mockBrandList[0].id);
                return {
                    ok: true,
                    status: 200,
                    data: mockBrandList[0]
                };
            }
        },
    };
});

describe(
    'Test brand list',
    () => {
        test('verify if brand list is being loaded', () => act(async () => {
            render(<BrandList></BrandList>);
            await screen.findByText(mockBrandList[0].name, {} , {timeout: 2000});

            const listRows = screen.getAllByRole('row');
            expect(listRows).toHaveLength(
                mockBrandList.length + 1 // Additional header row.
            );

            mockBrandList.forEach(async item => {
                const element = screen.getByText(item.name);
                expect(element).toBeInTheDocument();
            });
        }));

        test('verify if delete action is working properly', () => act(async () => {
            render(<BrandList/>);

            const deleteButton = await screen.findByTestId('default-list-delete-button');
            expect(deleteButton).toBeVisible();
            expect(deleteButton).toBeDisabled();

            const element = await screen.findByText(mockBrandList[0].name, {} , {timeout: 2000});
            fireEvent.click(element);

            expect(deleteButton).not.toBeDisabled();

            fireEvent.click(deleteButton);
        }));
    }
);