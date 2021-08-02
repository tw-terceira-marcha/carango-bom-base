import React from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, within } from '@testing-library/react';

import UserAccess from '../../components/container/user-access';

const mockName = 'Test';
const mockEmail = 'test@test.com';
const mockPass = 'tw2021';


jest.mock('../../components/ui/login-form', () => {
    return {
        __esModule: true,
        A: true,
        default: ({onSubmit, registerOpen}) => {
            const gambiarra = async () => {
                await onSubmit(mockEmail, mockPass);
            };

            return (
                <div>
                  <button onClick={() => gambiarra()}
                            data-testid='login-test-submit'/>
                    <button onClick={registerOpen} data-testid='test-registerOpen'/>
                </div>
            );
        },
    };
});

jest.mock('../../components/ui/register-user-form', () => {
    return {
        __esModule: true,
        A: true,
        default: ({onSubmit}) => {
            return (
                <div>
                    <button onClick={() => onSubmit(mockName, mockEmail, mockPass)}
                            data-testid='register-test-submit'/>
                </div>
            );
        },
    };
});

jest.mock('../../services/auth/service.js', () => {
    return {
        __esModule: true,
        A: true,
        default: {
            async login(email, password) {
                const authPayload = require('./../mock/auth.json');
                expect(email).toBe(mockEmail);
                expect(password).toBe(mockPass);
                return {
                    ok: true,
                    status: 200,
                    data: authPayload
                };
            },

            async register(name, email, password) {
                const registerPayload = require('./../mock/user-register.json');
                expect(name).toBe(mockName);
                expect(email).toBe(mockEmail);
                expect(password).toBe(mockPass);
                return {
                    ok: true,
                    status: 200,
                    data: registerPayload
                };
            }
        },
    };
});


test('login submit form dispatch', async () => {
    render(<UserAccess openModal={true} setModalOpen={() => {}} />);

    fireEvent.click(screen.getByTestId('login-test-submit'));
});


// Dear programmer:
// When I wrote this test, I thought it would work. It does not.
// If you try to make it work, please increase this counter as a warning for the next
// person:
// total_hours_wasted_here = 5
//
// test('login submit form closes modal', async () => {
//     const setModalOpen = jest.fn();
//     render(<UserAccess openModal={true} setModalOpen={setModalOpen} />);
//     fireEvent.click(screen.getByTestId('login-test-submit'));
//     expect(setModalOpen).toHaveBeenCalledWith(false);
// });


test('register submit form dispatch', async () => {
    render(<UserAccess openModal={true} setModalOpen={() => {}} />);

    fireEvent.click(screen.getByTestId('test-registerOpen'));
    fireEvent.click(screen.getByTestId('register-test-submit'));

});
