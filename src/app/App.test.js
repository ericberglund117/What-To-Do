import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, waitFor, screen, dispatchEvent } from '@testing-library/react';
import App from './App';
import ActivityArea from '../activityArea/ActivityArea';
import ActivityCard from '../activityCard/ActivityCard';
import { getActivity, getActivityParticipants, getActivityType } from '../apiCalls';
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
    type: "recreational",
    participants: 3,
    price: 0.05,
    link: "",
    key: "6081234",
    accessibility: 0.2
  }];

const expectedTypeActivity = [{
    activity: "Rent a sumosuit for a dinner party",
    type: "social",
    participants: 1,
    price: 0.05,
    link: "",
    key: "6081782",
    accessibility: 0.2
  }];

describe('App', () => {
  it('should be able to display a random activity when a user clicks the Search Activities button with no inputs filled out', async () => {
    getActivity.mockResolvedValueOnce(expectedActivity)

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
  });

  it('should be able to display a random activity when a user clicks the Search Activities button with type input filled out', async () => {
    getActivityType.mockResolvedValueOnce(expectedTypeActivity)

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const activityArea = screen.getByText('Activities List')
    expect(activityArea).toBeInTheDocument();

    const typeInput = screen.getByPlaceholderText('Activity Type')
    expect(typeInput).toBeInTheDocument();

    userEvent.type(typeInput, 'social')
    expect(typeInput).toHaveValue('social')

    const submitButton = screen.getByRole('button', { name: /search activities/i })
    userEvent.click(submitButton)
    expect(getActivityType).toHaveBeenCalledTimes(1);

    const receivedActivity = await waitFor(() => expectedTypeActivity)
    expect(receivedActivity).toHaveLength(1)

    render(
      <MemoryRouter>
        <ActivityArea activities={expectedTypeActivity} />
      </MemoryRouter>
    )
    const activityName = screen.getByText("Rent a sumosuit for a dinner party");
    expect(activityName).toBeInTheDocument();
  });

  it('should render an activityCard when a user clicks on an activity', async () => {
    getActivity.mockResolvedValueOnce(expectedActivity)

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
    const activityName = screen.getAllByRole('heading', { name: /activity\-idea/i })
    expect(activityName[1]).toBeInTheDocument();
    expect(screen.getByText("Text a friend you haven't talked to in a long time").closest('a')).toHaveAttribute('href', "/activity/6081071")
    const link = screen.getByText("Text a friend you haven't talked to in a long time")
    userEvent.click(link)
    const key = "6081071"

    render(
      <MemoryRouter>
        <ActivityCard cardKey={key} activities={expectedActivity}/>
      </MemoryRouter>);

    await waitFor(() => screen.getByText('Type: social'))
    await waitFor(() => screen.getByText('Participants: 2'))
    await waitFor(() => screen.getByText('Price:$ 0.05'))
    await waitFor(() => screen.getByText('Key: 6081071'))
  })
})
