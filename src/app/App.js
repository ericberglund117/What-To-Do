import './App.css';
import React, { Component } from 'react';
import Header from '../header/Header';
import ActivityForm from '../form/Form';
import { getActivity, getActivityParticipants, getActivityType } from '../apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activityCards: [],
      error: ''
    }
  }

  searchActivity = (activity) => {
    this.setState({ activityCards: [...this.state.activityCards, activity] })
  }

  getRandomActivity = () => {
    getActivity()
    .then(data => this.setState({ activityCards: data }))
    .catch(error => this.setState({ error: error.message }))
  }

  getActivityByParticipants = (participants) => {
    getActivityParticipants(participants)
    .then(data => this.setState({ activityCards: data }))
    .catch(error => this.setState({ error: error.message }))
  }

  getActivityByType = (type) => {
    getActivityType(type)
    .then(data => this.setState({ activityCards: data }))
    .catch(error => this.setState({ error: error.message }))
  }

  render() {
    return (
      <div>
        <Header />
        <ActivityForm getRandomActivity={this.getRandomActivity} getActivityParticipants={this.getActivityByParticipants} getActivityType={this.getActivityByType}/>
      </div>
    );
  }
}

export default App;
