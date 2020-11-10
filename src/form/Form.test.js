import React from 'react';
import ActivityForm from './Form';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

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

  it('should allow the user to choose a number of participants from the dropdown menu', () => {
    render(<ActivityForm />)

    const participantsInput = screen.getByRole('combobox');
    expect(participantsInput).toBeInTheDocument();

    const form = screen.getByTestId('activity-search');
    expect(form).toHaveFormValues({ participants: '0' });

    const participants = screen.getByLabelText('Participants')
    userEvent.selectOptions(participants, '2');
    expect(form).toHaveFormValues({ participants: '2' });
  });

  it('should allow the user to type in an activity input', () => {
    render(<ActivityForm />)

    const typeInput = screen.getByPlaceholderText('Activity Type')
    expect(typeInput).toBeInTheDocument();

    userEvent.type(typeInput, 'social')
    expect(typeInput).toHaveValue('social')
  });
});
