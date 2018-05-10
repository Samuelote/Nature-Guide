import { combineReducers } from 'redux';

import apiReducer from './reducer_results';

const rootReducer = combineReducers({
  apiArr: apiReducer
});


export default rootReducer;
