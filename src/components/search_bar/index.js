import { connect } from 'react-redux';
import BarView from './barView';
import { apiCall } from '../../actions';

const mapStateToProps = state => {
  // const { results } = state;
  // return { results };
}

const Banner = connect(
  mapStateToProps,
  { apiCall }
  // { savePhoto }
)(BarView);

export default Banner;
