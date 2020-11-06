import './App.css';
import React, { Component } from 'react';
import Header from '../header/Header';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activityCards: [],
      error: ''
    }
  }

  render() {
    return (
      <Header />
    );
  }
}

export default App;
