import './App.css';
import React, { Component } from 'react';
import Header from '../header/Header';
import ActivityForm from '../form/Form';

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

  render() {
    return (
      <div>
        <Header />
        <ActivityForm />
      </div>
    );
  }
}

export default App;
