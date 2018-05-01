import React, { Component } from 'react';
import unirest from 'unirest';
import './style.css';
import { connect } from 'react-redux';
import { apiCall } from '../../actions';

class SearchBar extends Component {

  constructor() {
    super();
    this.state = {
      results: [],
      term: ''

    }
  }

  componentDidMount() {
    this.props.apiCall();
  }
  mount() {
    this.setState({results: this.props.results.results})
  }
  updateTerm(e) {
    this.setState({term: document.querySelector('.SearchBar').value});
  }
  submitCity(){
    this.props.apiCall(this.state.term);
  }

  render() {
    // if (this.state.results.length === 0) return  <div className="btn" onClick={this.mount.bind(this)}>search</div>;

    return (
      <div className="SearchBarContainer">
        <input className="SearchBar" type="text" name="myCountry" placeholder="City" onChange={this.updateTerm.bind(this)} />
        <button className='Submit' onClick={this.submitCity.bind(this)}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
