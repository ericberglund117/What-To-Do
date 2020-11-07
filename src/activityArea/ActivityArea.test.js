import React from 'react';
import ActivityArea from './ActivityArea';
import { render, screen } from '@testing-library/react';

describe('ActivityArea', () => {
  it('should render a header for the activityArea', () => {
    const activity = [{
      activity: "Text a friend you haven't talked to in a long time",
      type: "social",
      participants: 2,
      price: 0.05,
      link: "",
      key: "6081071",
      accessibility: 0.2
    }]
    render(<ActivityArea activity={activity}/>)

    const header = screen.getByText('Activities List');
    expect(header).toBeInTheDocument();
  })
})
