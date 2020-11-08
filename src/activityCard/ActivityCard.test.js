import React from 'react';
import ActivityCard from './ActivityCard';
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';

describe('ActivityCard', () => {
  it('should display an activity card', () => {
    const activity = [{
      activity: 'join the circus',
      type: 'social',
      participants: 1,
      price: 0
    }]

    render(
      <MemoryRouter>
        <ActivityCard activities={activity}/>
      </MemoryRouter>
    )

    const activityTitle = screen.getByText('join the circus')
    const activityType = screen.getByText('Type: social')
    const activityParticipants = screen.getByText('Participants: 1')
    const activityPrice = screen.getByText('Price: 0')

    expect(activityTitle).toBeInTheDocument()
    expect(activityType).toBeInTheDocument()
    expect(activityParticipants).toBeInTheDocument()
    expect(activityPrice).toBeInTheDocument()
  })
})
