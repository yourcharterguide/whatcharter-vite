import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.jsx';

test('renders greeting', () => {
  render(<App />);
  expect(screen.getByText(/Hello WhatCharter/)).toBeInTheDocument();
});
