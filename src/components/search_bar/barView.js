import React, { Component } from 'react';
import './style.css';
import Banner from '../search_results';
import Loading from '../loading';
import {cities} from '../../assets/cities.js'
import { slideUp } from '../../assets/Greensock.js'

class SearchBar extends Component {

  constructor() {
    super();
    this.state = {
      listOfCities: [],
      results: [],
      term: '',
      comp: null,
      animate: true,
      autoIdx: 0
    }

    //refs
    this.inputRef = React.createRef();
    this.autoRef = React.createRef();

  }


  componentWillMount(){
    window.addEventListener('keydown', (e)=>{
      const { autoIdx } = this.state;
      let current = ''

      if(e.keyCode === 13){
        this.submitCity();
      }
      if (e.key === 'ArrowDown' && autoIdx < this.autoRef.current.childNodes.length){
        current = this.autoRef.current.childNodes[autoIdx].innerText;
        this.setState({autoIdx: autoIdx+1});
      } else if (e.key === 'ArrowUp' && autoIdx > 1){
        current = this.autoRef.current.childNodes[autoIdx-2].innerText;
        this.setState({autoIdx: autoIdx-1});
      } else {
        this.setState({autoIdx: 0});
        return;
      }
      this.inputRef.current.value = current;
    });
  }

  checkForMatch(e){ // pulls up cities for auto complete
    const arr = [];
    e = e.toLowerCase();
      cities.map((city, i) => {
        city = cities[i].city.toLowerCase();
        if (e.substr(0,e.length) === city.substr(0,e.length)) {
          arr.push([cities[i].city, cities[i].state]);
        }
        return null;
      });
      this.setState({listOfCities: arr})
  }
  autoComplete(){ // renders autoComplete components
    const list = this.state.listOfCities;
    if (list.length < 600) return list.map((el, i)=>{
      return <div className="City" key={i} onClick={this.selectCity.bind(this)}>{el[0]}, {el[1]}</div>
    })
  }
  selectCity(e){
    if (e.target) this.inputRef.current.value = e.target.innerText;
    this.updateTerm(this.inputRef.current);
    this.setState({listOfCities: []})
  }
  updateTerm(e) { // replaces term with clicked on/typed out term
    const val = e.target ? e.target.value : e.value
    const city = val.split(', ')[0];
    const state = val.split(', ')[1];
    this.setState({comp: null});
    this.setState({term: val});
    this.props.apiCall(city, state)
    this.checkForMatch(val);
  }

  submitCity(i = 0){ // triggers next phase of app
    console.log(i);
    this.inputRef.current.blur()
    if (this.inputRef.current.value){
      if (this.state.animate) slideUp();
      if (this.props.apiArr.results.length === 0 && i < 20 || typeof i === "object") {
        typeof i === "object" ? i = 1 : i++;
        setTimeout(()=>this.submitCity(i), 500);
        this.setState({comp: <Loading />});
      }
      else if (i >= 20){
        this.setState({comp: <div className='NoRes'>Error. Try Again</div>})
      }
      else {
        console.log('boom');
        this.setState({comp: <Banner />});
      }
      this.setState({animate: false})
    }
  }


  render() {

    return (
      <div className="SearchBarContainer">
        <div className='InputComponent'>
          <input ref={this.inputRef} type="text" className="SearchBar" name="myCountry" placeholder="City" onChange={this.updateTerm.bind(this)} onBlur={this.updateTerm.bind(this)} />
          <div className="Submit" onClick={this.submitCity.bind(this)}>&#8680;</div>
          <div ref={this.autoRef} className='AutoComplete'>
            {this.autoComplete()}
          </div>
        </div>
        {this.state.comp}
      </div>
    );
  }
}

export default SearchBar;
