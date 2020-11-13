import React from 'react';
import './ActivityCard.css';
import PropTypes from 'prop-types';

const ActivityCard = (props) => {
  const individualCard = props.activities.map((activity, index) => {
    if(props.cardKey === activity.key) {
      return (
        <section className="activity-card" key={index} data-testid ='activity-card'>
          <h2 className="act">Activity</h2>
          <h3 className="act-name">{activity.activity}</h3>
          <h3>Type: {activity.type}</h3>
          <h3>Participants: {activity.participants}</h3>
          <h3>Price:$ {activity.price}</h3>
          <h3>Key: {activity.key}</h3>
          <button
            type="button"
            className="favorite-btn"
            onClick={event => this.props.favoriteActivity}>
            Favorite!
          </button>
        </section>
      )
    }
  });
  return individualCard;
};

ActivityCard.propTypes = {
  cardKey: PropTypes.string,
  activities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ActivityCard;
