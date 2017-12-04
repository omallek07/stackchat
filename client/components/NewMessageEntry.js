import React, { Component } from 'react';
import store, { newMessageFromUser, gotNewMessageFromServer, postMessage } from '../store';

export default class NewMessageEntry extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.submitHandler = this.submitHandler.bind(this);
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

  submitHandler (evt) {
    evt.preventDefault();
    const channelId = this.props.channelId;
    const content = this.state.newMessageEntry;
    const name = this.state.name;
    let message = {
      content: content, channelId: channelId, name: name
    }
    let thunk = postMessage(message);
    store.dispatch(thunk)
  }

  render () {

    return (
      <form id="new-message-form" onSubmit={this.submitHandler} >
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
            <button className="btn btn-default" type="submit" >Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
