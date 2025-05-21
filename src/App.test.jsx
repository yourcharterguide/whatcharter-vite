import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.jsx';

test('renders first question', () => {
  render(<App />);
  expect(screen.getByText(/Wie viele Personen fahren mit/)).toBeInTheDocument();
});
