import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const middleWare = applyMiddleware(loggerMiddleware, thunkMiddleware);

const initialState = {
  messages: [],
  newMessageEntry: '',
  name: ''
}

const AUTHOR_NAME = 'AUTHOR_NAME';
const NEW_MESSAGE = 'NEW_MESSAGE';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

export const newAuthorName = (name) => {
  return {
    type: AUTHOR_NAME,
    name: name
  }
}

export const newMessageFromUser = (message) => {
  return {
    type: NEW_MESSAGE,
    newMessageEntry: message
  }
}

export const gotMessagesFromServer = (messages) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
  }
};

export const gotNewMessageFromServer = (message) => {
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    message: message
  }
};

export function fetchMessages() {
  return function thunk(dispatch) {
    axios.get('/api/messages')
    .then(res => res.data)
    .then(messages => {
      const action = gotMessagesFromServer(messages);
      dispatch(action);
    });
  }
}

export function postMessage(message) {
  return function thunk(dispatch) {
    axios.post('/api/messages', message)
    .then(res => res.data)
    .then(newMessage => {
      dispatch(gotNewMessageFromServer(newMessage));
      socket.emit('new-message', newMessage);
    });
  }
}

  function reducer (state = initialState, action) {
    let prevState = state;
    switch (action.type) {
      case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
      case NEW_MESSAGE:
      return Object.assign({}, prevState, {  newMessageEntry: action.newMessageEntry })
      case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, prevState, { messages: [...prevState.messages, action.message] });
      case AUTHOR_NAME:
      return Object.assign({}, prevState, { name: action.name })
      default:
      return prevState;
    }
  }
  /* eslint-disable no-underscore-dangle */
  let store = createStore(reducer, middleWare);
  /* eslint-enable */
  export default store;
