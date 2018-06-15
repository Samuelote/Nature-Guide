import axios from 'axios';
import json from '../assets/missoula.json'
export const FETCH_SOURCE = 'FETCH_SOURCE';
export const ACTIVE_ACTIVITY = 'ACTIVE_ACTIVITY';

export const apiCall = (city, state) => {
  // let results = json
  let results = [];
  let readyToMount = true;
  let config = {
    headers: {
      "X-Mashape-Key": 'ftwo40QkMxmshvFrpQP4v741IIkup1maWQQjsn6o2h9hmuaxkC',
      "Accept": 'application/json'
    }
  }
  if (city && state){
    axios.get(`https://trailapi-trailapi.p.mashape.com/?q[city_cont]=${city}&q[state_cont]=${state}`, config)
    .then((result) => {
      results.push(result.data.places);
    });
  }
  if (city){
    axios.get(`https://trailapi-trailapi.p.mashape.com/?q[city_cont]=${city}`, config)
    .then((result, pomc) => {
      results.push(result.data.places);
    });
  }
  return {
    type: FETCH_SOURCE,
    results,
    readyToMount
    // results: json.places,
    // readyToMount: true
  };
}

export const getActive = (act, idx) => {
  return {
    type: ACTIVE_ACTIVITY,
    act,
    idx
  }
}


export const htmlParser = (str) => {
  if(str && typeof str === 'string') {
        // str = str.replace(/&lt;/gmi, '<');
        str = str.replace(/&lt;br \/&gt;/gmi, '\n');
      }
      return str



}
