import React from 'react';
import Header from './Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
  it('should render the background section of the header', () => {
    render(<Header />);

    const backgroundSection = screen.getByTitle('background')

    expect(backgroundSection).toBeInTheDocument();
  });

  it('should render a title', () => {
    render(<Header />);

    const title = screen.getByText("What To Do?");

    expect(title).toBeInTheDocument();
  });

  it('should render a subtitle', () => {
    render(<Header />);

    const subtitle = screen.getByText("Open to possibilities");

    expect(subtitle).toBeInTheDocument();
  });

  it('should render a logo', () => {
  render(<Header />);

  const logo = screen.getByAltText('michael-logo');

  expect(logo).toBeInTheDocument();
  });
});
