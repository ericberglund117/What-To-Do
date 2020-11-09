import React from 'react';
import './ActivityCard';

const ActivityCard = (props) => {
  const individualCard = props.activities.map((activity, index) => {
    if(props.cardKey === activity.key) {
      return (
        <section className="activity-card" key={index}>
        <h2>Activity</h2>
        <h3>{activity.activity}</h3>
        <h3>Type: {activity.type}</h3>
        <h3>Participants: {activity.participants}</h3>
        <h3>Price: {activity.price}</h3>
        <h3>Key: {activity.key}</h3>
        </section>
      )
    }
  });
  return individualCard;
};

export default ActivityCard;
