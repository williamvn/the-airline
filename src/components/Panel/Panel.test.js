import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Panel from './Panel';

describe('<Panel />', () => {
  test('it should mount', () => {
    render(<Panel />);
    
    const panel = screen.getByTestId('Panel');

    expect(panel).toBeInTheDocument();
  });
});