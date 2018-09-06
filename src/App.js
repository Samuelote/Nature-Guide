import React, { Component } from 'react';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import './App.css';

import reducers from './reducers';
import Input from './components/search_bar';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="App">
          <Input />
        </div>
      </Provider>
    );
  }
}

export default App;
