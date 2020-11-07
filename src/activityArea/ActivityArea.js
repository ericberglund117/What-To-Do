import React from 'react';
import ActivityCard from '../activityCard/ActivityCard'
import './ActivityArea.css'

const ActivityArea = (props) => {
  const { activity } = props
  const individualCard = activity.map((act, index) => {
    return (
      <ActivityCard
        key={index}
        activities={act}
      />
      // <section className="activity-card">
      //   <h2>Activity</h2>
      //   <h3>{act.activity}</h3>
      //   <h3>Type: {act.type}</h3>
      //   <h3>Participants: {act.participants}</h3>
      //   <h3>Price: {act.price}</h3>
      // </section>
    )
  })
  return (
    <section className="activity-area">
      <h2>Activities List</h2>
      {individualCard}
    </section>
  );
};

export default ActivityArea;
