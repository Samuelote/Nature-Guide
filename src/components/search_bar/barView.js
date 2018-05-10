
import React, { Component } from 'react';
import unirest from 'unirest';
import './style.css';
import { connect } from 'react-redux';
import Banner from '../search_results';
import Loading from '../loading';

class SearchBar extends Component {

  constructor() {
    super();
    this.state = {
      results: [],
      term: '',
      comp: null,
      long: null,
      lat: null
    }
  }

  componentDidMount(){
  }

  updateTerm(e) {
    this.setState({comp: null});
    this.setState({term: document.querySelector('.SearchBar').value});
    this.props.apiCall(this.state.term);
  }
  submitCity(){
    document.querySelector('.Submit').classList.add('InputAnimation');
    document.querySelector('.SearchBar').classList.add('InputAnimation');
    if (this.props.apiArr.results.length === 0) {
      setTimeout(()=>this.submitCity(), 500);
      this.setState({comp: <Loading />});
    }
    else {
      // console.log(this.props.apiArr.results[0])
      this.setState({comp: <Banner />});
    }

  }

  render() {
    // if (this.state.results.length === 0) return  <div className="btn" onClick={this.mount.bind(this)}>search</div>;

    return (
      <div className="SearchBarContainer">
        <input type="text" className="SearchBar" name="myCountry" placeholder="City" onChange={this.updateTerm.bind(this)} />
        <button className='Submit glyphicon glyphicon-search' onClick={this.submitCity.bind(this)}></button>
        {this.state.comp}
      </div>
    );
  }
}

export default SearchBar;
