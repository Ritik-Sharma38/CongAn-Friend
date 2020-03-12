import React, {Component} from 'react';
import { View } from 'react-native';
import Counter from './ad.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  count: 0
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "INC": 
      return {
        count: state.count + 1
      };
    case "DEC":
      return {
        count: state.count - 1
      }
    default: 
        return state
  }
  return state;
}

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Counter/>
      </Provider>
    );
  }
} 