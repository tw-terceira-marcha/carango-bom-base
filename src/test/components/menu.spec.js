import React from 'react'

import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { List, ListItem, ListItemText } from '@material-ui/core'
import ApplicationMenu from '../../components/ui/menu'

const optionNames = ['Entrar', 'Veiculos', 'Marcas', 'Usuários'];

const options = () => {
    <List>
        {optionNames.map((text, index) => (
            <ListItem button key={text} data-testid='menu-item'>
                <ListItemText primary={text} />
            </ListItem>
        ))}
    </List>
}

test('show header when the user is not logged', async () => {
    var menuOpen = true;

    const setMenuOpen = (state) => {
        menuOpen = state;
    }

    const { findAllByTestId } = render(<ApplicationMenu options={options} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />);
    const listItems = await findAllByTestId('menu-item');
    expect(listItems).toHaveLength(optionNames.length());

    listItems.forEach((item, index) => {

        const { getByText } = within(item);
        const { name } = optionNames[index];

        expect(getByText(name)).toBeInTheDocument();
    });
})