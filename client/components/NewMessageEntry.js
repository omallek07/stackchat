import React, { Component } from 'react';
import store, { newMessageFromUser } from '../store';

export default class NewMessageEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  changeHandler (evt) {
    let value = evt.target.value;
    const action = newMessageFromUser(value);
    store.dispatch(action);
  }
  render () {
    console.log(this.state.newMessageEntry);
    return (
      <form id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            placeholder="Say something nice..."
            onChange={this.changeHandler}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
