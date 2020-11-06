import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ActivityForm extends Component {
  constructor() {
    super()
    this.state = {
      participants: '',
      type: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clearInputs = () => {
    this.setState({ participants: '', type:'' })
  }

  requestActivity = (event) => {
    const activity = {
      participants: this.state.participants,
      type: this.state.type,
    }
    this.props.searchActivity(activity);
    this.clearInputs();
  }

  render() {
    const { participants, type } = this.state;
    return (
      <form className="activity-search" title="activity-search">
        <h2>Search by Participants OR Type</h2>
        <label htmlFor="particpants" className="particpants-label">
          Participants
        </label>
        <input
          type="text"
          className="particpants-input"
          placeholder="Number of Participants"
          name="participants"
          value={participants}
          onChange={ event => this.handleChange(event) }
        />
        <label htmlFor="type" className="type-label">
          Type
        </label>
        <input
          type="text"
          className="type-input"
          placeholder="Activity Type"
          name="type"
          value={type}
          onChange={ event => this.handleChange(event) }
        />
        <button
          type="button"
          className="search-activity"
          onClick={event => this.requestActivity(event)}>
          Search Activities
        </button>
      </form>
    )
  }
}

export default ActivityForm;
