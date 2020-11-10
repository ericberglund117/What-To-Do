import React from 'react';
import { Link } from 'react-router-dom';
import './ActivityArea.css';

const ActivityArea = (props) => {
  const { activities } = props
  const individualActivity = activities.map((activity, index) => {
    return (
      <Link to={`/activity/${activity.key}`} key={activity.key} title='activity-name'>
        <h2 className="activity-idea" title="activity-idea" key={activity.key}>{activity.activity}</h2>
      </Link>
    )
  })

  return (
    <section className="activity-area">
      <h2 className="activities-list">Activities List</h2>
      {individualActivity.map(activity => <li key={activity.key}>{activity}</li>)}
    </section>
  );
};

export default ActivityArea;
