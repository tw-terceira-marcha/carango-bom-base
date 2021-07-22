import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApplicationHeader from '../../components/container/header';

test('show header when the user is not logged', async () => {
    render(<ApplicationHeader />);

    expect(screen.getByText('Carango Bom')).toBeVisible();

    fireEvent.click(screen.getByTestId('menu-button'));

    expect(screen.getByTestId('menu')).toBeVisible();

});
