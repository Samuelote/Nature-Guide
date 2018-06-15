import { connect } from 'react-redux';
import SearchResults from './searchResultsView';
import { apiCall, getActive } from '../../actions';
import React from 'react';


const mapStateToProps = state => {
  const { apiArr, readyToMount } = state;
  return { apiArr, readyToMount };
}

// const mapDispatchToProps = dispatch => {
//   return {
//     authenticate: () => alert('Authenticate')
//   }
// }

const Banner = connect(
  mapStateToProps,
  { apiCall, getActive },
)(SearchResults);

export default Banner;
