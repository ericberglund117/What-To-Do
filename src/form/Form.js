import React, { Component } from 'react';
import './Form.css'
import PropTypes from 'prop-types';

class ActivityForm extends Component {
  constructor() {
    super()
    this.state = {
      participants: 0,
      type: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clearInputs = () => {
    this.setState({ participants: '', type: '' })
  }

  requestActivity = (event) => {
    const activityParticipants = this.state.participants
    const activityType = this.state.type

    if(activityType !== '') {
      console.log(activityType)
      this.props.getActivityType(activityType)
    }
    if(activityParticipants > 0) {
      console.log(activityParticipants)
      this.props.getActivityParticipants(parseInt(activityParticipants))
    }
    if(!activityType && activityParticipants === 0) {
      this.props.getRandomActivity()
    }
    this.clearInputs();
  }

  render() {
    const { participants, type } = this.state;
    return (
      <form className="activity-search" title="activity-search">
        <h2>Need a Distraction From Quarantine and/or The Election?</h2>
        <h2>Find a Random Activity by Number of Participants OR Type</h2>
        <label htmlFor="particpants" className="participants-label">
          Participants
        </label>
        <select id="participants-numbers"
          name="participants"
          defaultValue={this.state.particpants}
          onChange={event => this.handleChange(event)}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
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
