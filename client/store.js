import { createStore } from 'redux'

const initialState = {
  messages: []
}

const DELETE_MESSAGE = 'DELETE_MESSAGE';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';


const deleteMessageAction = () => {
  return {type: DELETE_MESSAGE}
};

export const gotMessagesFromServer = (messages) => {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages: messages
    }
};


function reducer (state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
       return Object.assign({}, state, { messages: action.messages });
    default:
       return state;
  }
}


let store = createStore(reducer)
export default store;
