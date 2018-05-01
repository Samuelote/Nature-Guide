import React, { Component } from 'react';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import Banner from './components/search_results';
import Input from './components/search_bar';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="App">
          <Input />
          <Banner />
        </div>
      </Provider>
    );
  }
}

export default App;
