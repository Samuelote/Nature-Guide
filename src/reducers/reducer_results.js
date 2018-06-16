import { FETCH_SOURCE, ACTIVE_ACTIVITY } from '../actions';

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
    case ACTIVE_ACTIVITY:
      const active = action.act;
      const index = action.idx;
      return {
        ...state,
        active,
        index
      }
    default:
      return null;
  }
}
