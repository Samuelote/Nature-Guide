import unirest from 'unirest';

export const FETCH_SOURCE = 'FETCH_SOURCE';

export const apiCall = (city, lat, long) => {
  let results = [];
  let readyToMount = true;
  if (city){
    unirest.get(`https://trailapi-trailapi.p.mashape.com/?q[city_cont]=${city}`)
    .header("X-Mashape-Key", "ftwo40QkMxmshvFrpQP4v741IIkup1maWQQjsn6o2h9hmuaxkC")
    .header("Accept", "application/json")
    .end((result) => {
      results.push(result.body.places);
    });
  }
  if (lat && long){
    unirest.get(`https://trailapi-trailapi.p.mashape.com/?lat=${lat}$lon=${long}`)
    .header("X-Mashape-Key", "ftwo40QkMxmshvFrpQP4v741IIkup1maWQQjsn6o2h9hmuaxkC")
    .header("Accept", "application/json")
    .end((result) => {
      results.push(result.body.places);
    });
  }
  return {
    type: FETCH_SOURCE,
    results,
    readyToMount
  };
}
