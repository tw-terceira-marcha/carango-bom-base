import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicationHeader from '../../components/ui/header';

test('show header when the user is not logged', async () => {

    const setMenuOpen = jest.fn();

    render(<ApplicationHeader menuOpen={false} setMenuOpen={setMenuOpen} />);

    expect(screen.getByText('Carango Bom')).toBeVisible();

    fireEvent.click(screen.getByTestId('menu-button'));

    expect(setMenuOpen).toHaveBeenCalledWith(true);
});
