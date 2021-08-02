import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import RegisterUserForm  from '../../components/ui/register-user-form';
import Modal from '../../components/ui/modal';
import LoginForm from '../../components/ui/login-form';

describe('register form fields tests', () => {

    test('register form has name input', async () => {
        render(<RegisterUserForm />);
        expect(screen.getByTestId('name-input')).toBeTruthy();
    });

    test('register form has email input', async () => {
        render(<RegisterUserForm />);
        expect(screen.getByTestId('email-input')).toBeTruthy();
    });

    test('register form has password input', async () => {
        render(<RegisterUserForm />);
        const confirmPasswordInput = screen.getByTestId('create-password-input');
        expect(confirmPasswordInput).toBeTruthy();
    });

    test('register form has confirm input', async () => {
        render(<RegisterUserForm />);
        expect(screen.getByTestId('confirm-password-input')).toBeTruthy();
    });

    test('register button has correct text', async () => {
        render(<RegisterUserForm />);
        expect(screen.getByText('Cadastrar')).toBeTruthy();
    });
});

describe('flow register use form with login component', () => {
    test('open login modal', async () => {
        var open = false;

        const setMenuOpen = () => {
            open = true;
        };

        render(<Modal open={true} Component={<LoginForm onSubmit={() => {}} registerOpen={setMenuOpen}/>}/>);
        fireEvent.click(screen.getByTestId('register-button'));
        render(
            <Modal open={open} Component={ open ?
                <RegisterUserForm /> :
                <LoginForm onSubmit={() => {}} registerOpen={setMenuOpen}/>
            }/>
        );
        expect(screen.getByTestId('register-form')).toBeTruthy();
    });

    test('register form has correct handle fields', async () => {
        const name = 'myuser';
        const email = 'myEmail@gmail.com';
        const pass = 'mypass';

        let formName = '';
        let formEmail = '';
        let formPass = '';

        const submit = (name, login, pass) => {
            formName = name;
            formEmail = login;
            formPass = pass;
        };

        render(<RegisterUserForm onSubmit={submit}/>);

        const nameInput = screen.getByTestId('name-input');
        const emailInput = screen.getByTestId('email-input');
        const passInput = screen.getByTestId('create-password-input');

        userEvent.type(nameInput, name);
        userEvent.type(emailInput, email);
        userEvent.type(passInput, pass);

        fireEvent.click(screen.getByText('Cadastrar'));

        expect(formName).toBe(name);
        expect(formEmail).toBe(email);
        expect(formPass).toBe(pass);
    });
});
