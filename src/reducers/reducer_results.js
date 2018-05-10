import { FETCH_SOURCE } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SOURCE:
      const results = action.results;
      const bool = action.readyToMount;
      return {
        ...state,
        results,
        bool
      };
    default:
      return null;
  }
}
