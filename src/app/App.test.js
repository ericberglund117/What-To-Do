import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, waitFor, screen } from '@testing-library/react';
import App from './App';
import ActivityArea from '../activityArea/ActivityArea'
import { getActivity, getActivityParticipants, getActivityType } from '../apiCalls'
jest.mock('../apiCalls');

const expectedActivity = [{
  activity: "Text a friend you haven't talked to in a long time",
  type: "social",
  participants: 2,
  price: 0.05,
  link: "",
  key: "6081071",
  accessibility: 0.2
  }];

const expectedParticipantsActivity = [{
    activity: "Play Settlers of Catan",
    type: "social",
    participants: 3,
    price: 0.05,
    link: "",
    key: "6081071",
    accessibility: 0.2
  }];

describe('App', () => {
  it('should be able to display a random activity when a user clicks the Search Activities button with no inputs filled out', async () => {
    getActivity.mockResolvedValueOnce(expectedActivity)
    const mockRandomActivity = jest.fn()

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const activityArea = screen.getByText('Activities List')
    expect(activityArea).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /search activities/i })
    userEvent.click(submitButton)
    expect(getActivity).toHaveBeenCalledTimes(1);

    const receivedActivity = await waitFor(() => expectedActivity)
    expect(receivedActivity).toHaveLength(1)

    render(
      <MemoryRouter>
        <ActivityArea activities={expectedActivity} />
      </MemoryRouter>
    )
    const activityName = screen.getByText("Text a friend you haven't talked to in a long time");
    expect(activityName).toBeInTheDocument();
  });

  it('should be able to display a random activity when a user clicks the Search Activities button with participants input filled out', async () => {
    getActivityParticipants.mockResolvedValueOnce(expectedParticipantsActivity)
    const mockRandomActivity = jest.fn()

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const activityArea = screen.getByText('Activities List')
    expect(activityArea).toBeInTheDocument();

    const participantsInput = screen.getByRole('combobox')
    expect(participantsInput).toBeInTheDocument();

    const form = screen.getByTestId('activity-search');
    expect(form).toHaveFormValues({ participants: '0' });

    const participants = screen.getByLabelText('Participants')
    userEvent.selectOptions(participants, '3');
    expect(form).toHaveFormValues({ participants: '3' });

    const submitButton = screen.getByRole('button', { name: /search activities/i })
    userEvent.click(submitButton)
    expect(getActivityParticipants).toHaveBeenCalledTimes(1);

    const receivedActivity = await waitFor(() => expectedParticipantsActivity)
    expect(receivedActivity).toHaveLength(1)

    render(
      <MemoryRouter>
        <ActivityArea activities={expectedParticipantsActivity} />
      </MemoryRouter>
    )
    const activityName = screen.getByText("Play Settlers of Catan");
    expect(activityName).toBeInTheDocument();
  })
})
