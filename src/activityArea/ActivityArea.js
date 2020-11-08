import React from 'react';
import ActivityCard from '../activityCard/ActivityCard';
import { Link } from 'react-router-dom';
import './ActivityArea.css';

const ActivityArea = (props) => {
  const { activities } = props
  const individualCard = activities.map((activity, index) => {
    return (
      <Link to={`/${activity.key}`} key={index} className='activity-card' title='activity-card'>
        <h2>{activity.activity}</h2>
      </Link>
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
