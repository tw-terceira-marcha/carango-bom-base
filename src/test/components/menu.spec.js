import React from 'react';

import { render, within,fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicationMainMenu from '../../components/container/main-menu';
import LoginForm from '../../components/ui/login-form';
import Modal from '../../components/ui/modal';
import { MemoryRouter, Route } from 'react-router-dom';

const optionNames = ['Entrar', 'Veiculos', 'Marcas'];

describe('menu login tests', () => { 
    test('menu when the user is not logged', async () => {
        var menuOpen = true;

        const setMenuOpen = (state) => {
            menuOpen = state;
        };

        const { findAllByTestId } = render(<ApplicationMainMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />);
        const listItems = await findAllByTestId('menu-item');
        expect(listItems).toHaveLength(optionNames.length);

        listItems.forEach((item, index) => {

            const { getByText } = within(item);
            const name = optionNames[index];

            expect(getByText(name)).toBeInTheDocument();
        });
    });

    test('open login modal in click enter button', async () => {

        const setLoginModalOpen = jest.fn();
        const setMenuOpen = jest.fn();
        render(<ApplicationMainMenu menuOpen={true} setMenuOpen={setMenuOpen} setModalOpen={setLoginModalOpen}/>);

        fireEvent.click(screen.getByTestId('login-button'));
        
        expect(setLoginModalOpen).toHaveBeenCalledWith(true);
        expect(setMenuOpen).toHaveBeenCalledWith(false);

    });

    test('close login modal on click and on key down', async () => {

        const setLoginModalOpen = jest.fn();
        const setMenuOpen = jest.fn();

        const { getByTestId } = render(<ApplicationMainMenu menuOpen={true} setMenuOpen={setMenuOpen} setModalOpen={setLoginModalOpen}/>);
        fireEvent.click(getByTestId('menu'));
        fireEvent.keyDown(getByTestId('menu'));

        expect(setMenuOpen).toHaveBeenCalledWith(false);
        expect(setMenuOpen).toHaveBeenCalledTimes(2);
    });

    test('open login modal', async () => {
        var open = false;
        
        const setLoginModalOpen = jest.fn();
        const setMenuOpen = () => {
            open = true;
        };

        render(<ApplicationMainMenu menuOpen={true} setMenuOpen={setMenuOpen} setModalOpen={setLoginModalOpen}/>);
        fireEvent.click(screen.getByTestId('login-button'));
        render(<Modal open={open} Component={<LoginForm onSubmit={() => {}} />}/>);
        expect(screen.getByTestId('login-input')).toBeTruthy();
        expect(screen.getByTestId('password-input')).toBeTruthy();
    });
});

describe('test menu interaction', () => {
    test('vehicle click in menu', () => {
        render(
            <div>
                <Route path="/vehicles">
                    <p>Teste</p>
                </Route>
                <Route path="/">
                    <p>Te</p>
                </Route>
                <ApplicationMainMenu menuOpen={true} setMenuOpen={() => {}}/>
            </div>
            ,{ wrapper: MemoryRouter });
        expect(screen.getByText('Te')).toBeVisible();
        fireEvent.click(screen.getByTestId('vehicle-button'));  
        expect(screen.getByText('Teste')).toBeVisible();
    });
    test('brand list click in menu', () => {
        render(
            <div>
                <Route path="/brand-list">
                    <p>Brand component</p>
                </Route>
                <ApplicationMainMenu menuOpen={true} setMenuOpen={() => {}}/>
            </div>
            ,{ wrapper: MemoryRouter });
        fireEvent.click(screen.getByTestId('brand-button'));  
        expect(screen.getByText('Brand component')).toBeVisible();
    });
});