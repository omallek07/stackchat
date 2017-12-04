import { createStore } from 'redux'

const initialState = {
  messages: [],
  newMessageEntry: '',
}

const NEW_MESSAGE = 'NEW_MESSAGE';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

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

function reducer (state = initialState, action) {
  let prevState = state;
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages });
    case NEW_MESSAGE:
      return Object.assign({}, prevState, {  newMessageEntry: action.newMessageEntry })
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return Object.assign({}, prevState, { messages: [...prevState.messages, action.message] });
    default:
       return prevState;
  }
}

let store = createStore(reducer)
export default store;
