import React from 'react';
import './ActivityArea.css'

const ActivityArea = (props) => {
  const { activity } = props
  return (
    activity.map(act => {
      return (
      <section className="activity-card">
        <h2>Activity</h2>
        <h3>{act.activity}</h3>
        <h3>Type: {act.type}</h3>
        <h3>Participants: {act.participants}</h3>
        <h3>Price: {act.price}</h3>
      </section>
      )
    })
  );
};

export default ActivityArea;
