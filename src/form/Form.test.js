import React from 'react';
import ActivityForm from './Form';
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';

describe('ActivityForm', () => {
  it('should render two headers', () => {
    render(<ActivityForm />)

    const header1 = screen.getByText('Need a Distraction From Quarantine and/or The Election?');
    const header2 = screen.getByText('Find a Random Activity by Number of Participants OR Type');

    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
  });

  it('should render a participants search input', () => {
    render(<ActivityForm />)

    const participantsInput = screen.getByRole('combobox')
    expect(participantsInput).toBeInTheDocument();
  });

  it('should render a type search input', () => {
    render(<ActivityForm />)

    const typeInput = screen.getByPlaceholderText('Activity Type')
    expect(typeInput).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    render(<ActivityForm />)

    const submitButton = screen.getByRole('button', { name: /search activities/i })
    expect(submitButton).toBeInTheDocument();
  });

});
