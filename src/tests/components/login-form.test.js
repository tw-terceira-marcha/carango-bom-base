import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../components/login/login-form';


describe(
  'Test login form',
  () => {
    test('login form has login input', async () => {
      render(<LoginForm/>);
      expect(screen.getByTestId('login-input')).toBeTruthy();
    });

    test('login form has password input', async () => {
      render(<LoginForm/>);
      const passwordInput = screen.getByTestId('password-input');
      expect(passwordInput).toBeTruthy();
      // TODO: check if input type is 'password'
      // expect(passwordInput).toHaveAttribute("type", "password");
    });

    test('login form has login button', async () => {
      render(<LoginForm/>);
      expect(screen.getByTestId('login-button')).toBeTruthy();
    });

    test('login button has correct text', async () => {
      render(<LoginForm/>);
      expect(screen.getByText('Entrar')).toBeTruthy();
    });
  }
);


describe(
  'Test login form submit',
  () => {
    test('login form has correct data', async () => {
      const user = 'myuser';
      const pass = 'mypass';

      let formUser = '';
      let formPass = '';

      const submit = (user, pass) => {
        formUser = user;
        formPass = pass;
      };

      render(<LoginForm onSubmit={submit}/>);

      const loginInput = screen.getByTestId('login-input');
      const passwordInput = screen.getByTestId('password-input');

      userEvent.type(loginInput, user);
      userEvent.type(passwordInput, pass);

      fireEvent.click(screen.getByText('Entrar'));

      expect(formUser).toBe(user);
      expect(formPass).toBe(pass);
    });


    test('login form has no data', async () => {
      const user = '';
      const pass = '';

      let formUser = 'myuser';
      let formPass = 'mypass';

      const submit = (user, pass) => {
        formUser = user;
        formPass = pass;
      };

      render(<LoginForm onSubmit={submit}/>);

      fireEvent.click(screen.getByText('Entrar'));

      expect(formUser).toBe(user);
      expect(formPass).toBe(pass);
    });
  }
);
