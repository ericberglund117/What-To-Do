import './App.css';
import React, { Component } from 'react';
import Header from '../header/Header';
import ActivityForm from '../form/Form';
import ActivityArea from '../activityArea/ActivityArea';
import ActivityCard from '../activityCard/ActivityCard';
import FavActivities from '../favActivities/FavActivities';
import { Route } from 'react-router-dom';
import { getActivity, getActivityParticipants, getActivityType } from '../apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activityCards: [],
      favoriteCards: [],
      error: '',
      isLoaded: false,
      isFavorited: false
    }
  }

  getRandomActivity = () => {
    getActivity()
    .then(data => this.setState({ activityCards: [...this.state.activityCards, data] }))
    .catch(error => this.setState({ error: error.message }))
  }

  getActivityByParticipants = (participants) => {
    getActivityParticipants(participants)
    .then(data => this.setState({ activityCards: [...this.state.activityCards, data] }))
    .catch(error => this.setState({ error: error.message }))
  }

  getActivityByType = (type) => {
    getActivityType(type)
    .then(data => this.setState({ activityCards: [...this.state.activityCards, data] }))
    .catch(error => this.setState({ error: error.message }))
  }

  favoriteActivity = (key) => {
    const match = this.state.activityCards.find(activity => activity.key === key)
    if(match) {
      this.setState({ isFavorited: true })
      this.setState({ favoriteCards: [...this.state.favoriteCards, match] })
    }
  }

  renderFavActivities = () => {
    return (
      <section data_testid="fav-cards">
        <Route path='/activity/favorited' render={() => <FavActivities favActivites={this.state.favoriteCards} />} />
      </section>
    )
  }

  unfavoriteActivity = (key) => {
    const match = this.state.favoriteCards.find(activity => activity.key === key)
    if(match) {
      this.setState({ isFavorited: false })
      this.setState({ favoriteCards: this.state.favoriteCards.filter(activity => {
       return activity !== key
      })});
    }
  }
  // create button to display favoriteCards

  render() {
    return (
      <div className='main-body'>
        <Route>
          <Route exact path='/'>
            <Header />
            <ActivityForm getRandomActivity={this.getRandomActivity} getActivityParticipants={this.getActivityByParticipants} getActivityType={this.getActivityByType} />
            <button
              type="button"
              className="favorite-btn"
              onClick={() => {this.renderFavActivities()}}>
              Favorite Activities!
            </button>
            <ActivityArea activities={this.state.activityCards}/>
          </Route>
        <section className="act-card-section">
          <Route path ='/activity/:key' render = {({match}) => {
            const { key } = match.params
            return <ActivityCard cardKey={key} activities={this.state.activityCards} favoriteActivity={this.favoriteActivity} isFavorited={this.state.isFavorited} />
          }}/>
        </section>
        </Route>
      </div>
    );
  }
}

export default App;
