import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BrandRegister from '../../pages/brand-register'; 

const mockName = 'test';
const mockId = 42;
jest.mock('../../services/brand/service.js', () => {
    return {
        __esModule: true,
        A: true,
        default: {
            async create({name}) {
                const registerPayload = require('../mock/brand-register.json');
                expect(name).toBe(mockName);
                return {
                    ok: true,
                    status: 200,
                    data: registerPayload
                };
            },
            async update({name, id}) {
                const registerPayload = require('../mock/brand-register.json');
                expect(name).toBe(mockName);
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

describe('Brand Register', () => {
    test('button and input in to screen page',() => {
        const history = createMemoryHistory();
        const route = '/brand-list/2';
        history.push(route);

        render(
            <Router history={history}>
                <BrandRegister />
            </Router>
        );
        expect(screen.getByTestId('input-register-brand')).toBeVisible();
        expect(screen.getByTestId('button-register-brand')).toBeVisible();
        expect(screen.getByTestId('cancel-register-brand')).toBeVisible();
    });

    test('test with validation input',async () => {
        const history = createMemoryHistory();
        const route = '/brand-list';
        history.push(route);

        render(
            <Router history={history}>
                <BrandRegister />
            </Router>
        );
        const input = screen.getByTestId('input-register-brand');
        userEvent.type(input, 'as');
        fireEvent.focusOut(input);

        expect(await screen.findByText('Marca deve ter ao menos 3 letras.')).toBeVisible();        
    });
    
    test('test send create brand',(async () => {
        const history = createMemoryHistory();
        const route = '/brand-list';
        history.push(route);

        render(
            <Router history={history}>
                <BrandRegister />
            </Router>
        );
        const input = screen.getByTestId('input-register-brand');
        const button = screen.getByTestId('button-register-brand');
        userEvent.type(input, mockName);
        userEvent.click(button);
    }));

    test('test send update brand',(async () => {
        const history = createMemoryHistory();
        const route = '/brand-list/' + mockId;
        history.push(route);

        render(
            <Router history={history}>
                <BrandRegister />
            </Router>
        );
        const input = screen.getByTestId('input-register-brand');
        const button = screen.getByTestId('button-register-brand');
        userEvent.type(input, mockName);
        userEvent.click(button);
    }));
});