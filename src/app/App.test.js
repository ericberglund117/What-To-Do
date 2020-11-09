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
  })
})
