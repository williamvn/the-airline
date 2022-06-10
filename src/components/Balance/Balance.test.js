import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Balance from './Balance';

describe('<Balance />', () => {
  test('it should mount', () => {
    render(<Balance />);
    
    const balance = screen.getByTestId('Balance');

    expect(balance).toBeInTheDocument();
  });
});