import { connect } from 'react-redux';
import SearchResults from './searchResultsView';
import { apiCall } from '../../actions';

const mapStateToProps = state => {
  const { results } = state;
  return { results };
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: () => alert('Authenticate')
  }
}

const Banner = connect(
  mapStateToProps,
  { apiCall }
  // { savePhoto }
)(SearchResults);

export default Banner;
