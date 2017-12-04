import React, { Component } from 'react';
import store, { newAuthorName } from '../store';

export default class NameEntry extends Component {
  constructor () {
    super();
    this.state = store.getState();
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  changeHandler (evt) {
    let value = evt.target.value;
    const action = newAuthorName(value);
    store.dispatch(action);
  }

  render () {
    return (
      <form className="form-inline">
      <label htmlFor="name">Your name:</label>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        className="form-control"
        onChange={this.changeHandler}
      />
      </form>
    )
  }
}
