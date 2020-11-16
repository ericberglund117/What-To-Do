import React from 'react';
import './FavActivities.css'
import PropTypes from 'prop-types';

const FavActivities = (props) => {
  const { favActivities } = props
  if(favActivities.length === 0) {
    return (
      <section data_testid="no-favs">
        <h3>You have not favorited any activities yet!</h3>
      </section>
    )
  } else {
    console.log('look right here')
    const favoritedCard = favActivities.map((activity, index) => {
      return (
        <section className="factivity-card" key={index} data-testid ='activity-card'>
          <h2 className="act">Activity</h2>
          <h3 className="act-name">{activity.activity}</h3>
          <h3>Type: {activity.type}</h3>
          <h3>Participants: {activity.participants}</h3>
          <h3>Price:$ {activity.price}</h3>
          <h3>Key: {activity.key}</h3>
          <button
            type="button"
            className="favorite-btn"
            onClick={() => {props.unfavoriteActivity(activity.key)}}>
            Unfavorite!
          </button>
        </section>
      )
    })
    return favoritedCard
  }
}

export default FavActivities;
