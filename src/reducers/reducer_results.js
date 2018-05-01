import { FETCH_SOURCE } from '../actions';
import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SOURCE:
      const results = action.results;
      return {
        ...state,
        results
      };
    default:
      return null;
  }
}
