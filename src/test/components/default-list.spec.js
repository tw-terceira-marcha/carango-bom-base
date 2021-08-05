import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, act, screen } from '@testing-library/react';

import DefaultList from '../../components/container/default-list';


describe(
    'Test default list',
    () => {
        test('verify components in screen', () => act(async () => {
            render(
                <DefaultList load={() => []} columns={[]} />
            );
            expect(screen.getByTestId('default-list-delete-button')).toBeVisible();
            expect(screen.getByTestId('default-list-update-button')).toBeVisible();
            expect(screen.getByTestId('default-list-add-button')).toBeVisible();
        }));

        test('loads and displays a list of vehicle cards', () => act(async () => {
            const items = [
                { id: 1, name: 'test' },
                { id: 2, name: 'apple' }
            ];

            const loadItems = jest.fn(async () => items);

            const columns = [
                { field: 'name', headerName: 'Nome', width: 200 }
            ];

            render(<DefaultList load={loadItems} columns={columns} />);

            
            await screen.findByText(items[0].name);
            
            expect(loadItems).toBeCalledTimes(1);

            const listRows = await screen.getAllByRole('row');
            expect(listRows).toHaveLength(
                items.length + 1 // Additional header row.
            );

            items.forEach(async item => {
                const element = await screen.getByText(item.name);
                expect(element).toBeInTheDocument();
            });
        }));

        test('loads an empty list of vehicle cards', async () => {
            const items = [];

            const columns = [
                { field: 'name', headerName: 'Nome', width: 200 }
            ];

            render(<DefaultList load={() => items} columns={columns} />);

            await screen.findByText(columns[0].headerName);

            const listRows = await screen.getAllByRole('row');
            expect(listRows).toHaveLength(1);
        });

        test('verify if add function is being called', () => act(async () => {

            const add = jest.fn();
            const items = [];

            const columns = [
                { field: 'name', headerName: 'Nome', width: 200 }
            ];

            render(<DefaultList load={() => items} columns={columns} add={add} />);

            screen.getByTestId('default-list-add-button').click();

            expect(add).toBeCalledTimes(1);
        }));

        test('verify if update function is being called', () => act(async () => {

            const update = jest.fn();

            const items = [
                { id: 1, name: 'test' },
                { id: 2, name: 'apple' }
            ];

            const columns = [
                { field: 'name', headerName: 'Nome', width: 200 }
            ];

            render(<DefaultList load={() => items} columns={columns} update={update} />);

            const element = await screen.findByText('test');
            
            element.click();

            screen.getByTestId('default-list-update-button').click();

            expect(update).toHaveBeenCalledWith(1);
        }));

        test('verify if remove function is being called', () => act(async () => {

            const remove = jest.fn();

            const items = [
                { id: 1, name: 'test' },
                { id: 2, name: 'apple' }
            ];

            const columns = [
                { field: 'name', headerName: 'Nome', width: 200 }
            ];

            render(<DefaultList load={() => items} columns={columns} remove={remove} />);

            const element = await screen.findByText('test');
            
            element.click();

            screen.getByTestId('default-list-delete-button').click();

            expect(remove).toHaveBeenCalledWith(1);
        }));
    }
);
