import { connect } from 'react-redux';
import MainView from './mainView';

const mapStateToProps = state => {
  const { apiArr } = state;
  return { apiArr };
}


const Container = connect(
  mapStateToProps,
)(MainView);

export default Container;
