import unirest from 'unirest';
import axios from 'axios';

export const FETCH_SOURCE = 'FETCH_SOURCE';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

const API_KEY = '?key=pomc';

export const apiCall = (city) => {
  let results = [];
  unirest.get("https://trailapi-trailapi.p.mashape.com/?q[city_cont]="+city)
    .header("X-Mashape-Key", "ftwo40QkMxmshvFrpQP4v741IIkup1maWQQjsn6o2h9hmuaxkC")
    .header("Accept", "application/json")
    .end((result) => {
      results.push(result.body.places);
  });
  return {
    type: FETCH_SOURCE,
    results
  };
}
