import React from 'react';

import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicationMainMenu from '../../components/container/main-menu';

const optionNames = ['Entrar'];

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