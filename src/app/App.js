import './App.css';
import React, { Component } from 'react';
import Header from '../header/Header';
import ActivityForm from '../form/Form';
import ActivityArea from '../activityArea/ActivityArea'
import ActivityCard from '../activityCard/ActivityCard'
import { Route } from 'react-router-dom';
import { getActivity, getActivityParticipants, getActivityType } from '../apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activityCards: [],
      error: ''
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

  render() {
    return (
      <div className='main-body'>
        <Route>
          <Route exact path='/'>
            <Header />
            <ActivityForm getRandomActivity={this.getRandomActivity} getActivityParticipants={this.getActivityByParticipants} getActivityType={this.getActivityByType} />
            <ActivityArea activities={this.state.activityCards}/>
          </Route>
        <section className="act-card-section">
          <Route path ='/activity/:key' render = {({match}) => {
            const { key } = match.params
            return <ActivityCard cardKey={key} activities={this.state.activityCards} />
          }}/>
        </section>
        </Route>
      </div>
    );
  }
}

export default App;
