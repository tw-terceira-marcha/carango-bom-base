import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VehicleRegister from '../../pages/vehicle-register'; 

const mockModel = 'test';
const mockValue = '25000';
const mockYear = '2021';
const mockId = '42';

jest.mock('../../services/vehicle/service.js', () => {
    return {
        __esModule: true,
        A: true,
        default: {
            async create({vehicle}) {
                const registerPayload = require('../mock/vehicle-register.json');
                expect(vehicle.model).toBe(mockModel);
                expect(vehicle.year).toBe(mockYear);
                expect(vehicle.value).toBe(mockValue);
                return {
                    ok: true,
                    status: 200,
                    data: registerPayload
                };
            },
            async update({vehicle, id}) {
                const registerPayload = require('../mock/vehicle-register.json');
                expect(vehicle.model).toBe(mockModel);
                expect(vehicle.year).toBe(mockYear);
                expect(vehicle.value).toBe(mockValue);
                expect(id).toBe(mockId);
                return {
                    ok: true,
                    status: 200,
                    data: registerPayload
                };
            }
        },
    };
});

describe('Vehicle Register', () => {
    test('button and input into screen page',() => {
        const history = createMemoryHistory();
        const route = '/vehicle-list/2';
        history.push(route);

        render(
            <Router history={history}>
                <VehicleRegister />
            </Router>
        );
        expect(screen.getByTestId('input-register-vehicle-brand')).toBeVisible();
        expect(screen.getByTestId('input-register-vehicle-model')).toBeVisible();
        expect(screen.getByTestId('input-register-vehicle-year')).toBeVisible();
        expect(screen.getByTestId('input-register-vehicle-value')).toBeVisible();
        expect(screen.getByTestId('button-register-vehicle')).toBeVisible();
        expect(screen.getByTestId('cancel-register-vehicle')).toBeVisible();
    });

    test('test with validation input',async () => {
        const history = createMemoryHistory();
        const route = '/vehicle-list';
        history.push(route);

        render(
            <Router history={history}>
                <VehicleRegister />
            </Router>
        );
        const modelInput = screen.getByTestId('input-register-vehicle-model');
        const valueInput = screen.getByTestId('input-register-vehicle-value');
        const yearInput = screen.getByTestId('input-register-vehicle-year');
        userEvent.type(modelInput, 'as');
        fireEvent.focusOut(modelInput);

        expect(await screen.findByText('Veiculo deve ter ao menos 3 letras.')).toBeVisible();     
        
        userEvent.type(valueInput, '0');
        fireEvent.focusOut(valueInput);

        expect(await screen.findByText('Veiculo deve ter preço maior do que 0.')).toBeVisible();     
        
        userEvent.type(yearInput, '1900');
        fireEvent.focusOut(yearInput);

        expect(await screen.findByText('Veiculo deve ser de um ano maior que 1900.')).toBeVisible();
    });
    
    test('test send create vehicle',(async () => {
        const history = createMemoryHistory();
        const route = '/vehicle-list';
        history.push(route);

        render(
            <Router history={history}>
                <VehicleRegister />
            </Router>
        );
        const modelInput = screen.getByTestId('input-register-vehicle-model');
        const valueInput = screen.getByTestId('input-register-vehicle-value');
        const yearInput = screen.getByTestId('input-register-vehicle-year');
        const button = screen.getByTestId('button-register-vehicle');
        userEvent.type(modelInput, mockModel);
        userEvent.type(valueInput, mockValue);
        userEvent.type(yearInput, mockYear);
        userEvent.click(button);
    }));

    test('test send update vehicle',(async () => {
        const history = createMemoryHistory();
        const route = '/vehicle-list/' + mockId;
        history.push(route);

        render(
            <Router history={history}>
                <VehicleRegister />
            </Router>
        );
        const modelInput = screen.getByTestId('input-register-vehicle-model');
        const valueInput = screen.getByTestId('input-register-vehicle-value');
        const yearInput = screen.getByTestId('input-register-vehicle-year');
        const button = screen.getByTestId('button-register-vehicle');
        userEvent.type(modelInput, mockModel);
        userEvent.type(valueInput, mockValue);
        userEvent.type(yearInput, mockYear);
        userEvent.click(button);
    }));
});