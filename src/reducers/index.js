import { combineReducers } from 'redux';

import apiReducer from './reducer_results';

const rootReducer = combineReducers({
  results: apiReducer
});


export default rootReducer;
