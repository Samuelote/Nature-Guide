import { connect } from 'react-redux';
import BarView from './barView';
import React from 'react'
import { apiCall, htmlParser } from '../../actions';


const mapStateToProps = state => {
  const { apiArr } = state;
  return { apiArr };
}

const Banner = connect(
  mapStateToProps,
  { apiCall }
  // { savePhoto }
)(BarView);

export default Banner;
