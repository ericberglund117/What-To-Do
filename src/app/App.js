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

  componentDidMount = () => {
    
  }

  render() {
    return (
      <div>
        <Header />
        <ActivityForm searchActivity={this.searchActivity}/>
      </div>
    );
  }
}

export default App;
