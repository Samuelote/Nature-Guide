import React, { Component } from 'react';
import unirest from 'unirest';
import './style.css';
import { connect } from 'react-redux';
import { apiCall } from '../../actions';

class API extends Component {

  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
      btnReset: false
    }
  }


  componentDidMount() {
    this.props.apiCall();
  }
  mount() {
    this.setState({results: this.props.results.results})
  }

  increaseIndex() {
    document.querySelector('.Next').disabled = true;
    document.querySelector('.Back').disabled = true;
    setTimeout(()=>{
      document.querySelector('.Next').disabled = false;
      document.querySelector('.Back').disabled = false;
    }, 1000);
    this.setState({btnReset: true});
    const array = document.getElementsByClassName('Column');
    for (let i = 0; i < array.length; i++){
      array[i].style.animation = 'SlideLeft 1s';
      setTimeout(()=>array[i].style.animation = 'none', 1000);
    }
    setTimeout(()=>{
      (this.state.index < this.state.results[0].length-6) ?
      this.setState({index: this.state.index+3}) :
      this.setState({index: 0});
    }, 300);
  }
  decreaseIndex() {
    document.querySelector('.Next').disabled = true;
    document.querySelector('.Back').disabled = true;
    setTimeout(()=>{
      document.querySelector('.Next').disabled = false;
      document.querySelector('.Back').disabled = false;
    }, 1000);
    this.setState({btnReset: true});
    const array = document.getElementsByClassName('Column');
    for (let i = 0; i < array.length; i++){
      array[i].style.animation = 'SlideLeft 1s reverse ease-in-out';
      setTimeout(()=>array[i].style.animation = 'none', 1000);
    }
    setTimeout(()=>{
        (this.state.index === 0) ?
        this.setState({index: this.state.results[0].length-5}) :
        this.setState({index: this.state.index-3});
    }, 600);

      // const array = document.getElementsByClassName('Column');
      // for (let i = 0; i < array.length; i++){
      //   array[i].style.animation = 'SlideLeft .3s linear';
      //   setTimeout(()=>array[i].style.animation = 'none', 400);
      // }
      // setTimeout(()=>{
      //   (this.state.index === 0) ?
      //   this.setState({index: this.state.results[0].length-5}) :
      //   this.setState({index: this.state.index-3});
      // }, 150);
  }

  render() {
    if (this.state.results.length === 0) return  <div className="btn" onClick={this.mount.bind(this)}>search</div>;

    // variables
    let title = this.state.results[0][this.state.index].name;
      let description = this.state.results[0][this.state.index].activities[0].description;
      let thumbnail = (this.state.results[0][this.state.index].activities[0].thumbnail) ?
                            this.state.results[0][this.state.index].activities[0].thumbnail :
                                  "https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/photo-256.png";
      let title2 = this.state.results[0][this.state.index+1].name;
      let description2 = this.state.results[0][this.state.index+1].activities[0].description;
      let thumbnail2 = (this.state.results[0][this.state.index+1].activities[0].thumbnail) ?
                            this.state.results[0][this.state.index+1].activities[0].thumbnail :
                                  "https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/photo-256.png";
      let title3 = this.state.results[0][this.state.index+2].name;
      let description3 = this.state.results[0][this.state.index+2].activities[0].description;
      let thumbnail3 = (this.state.results[0][this.state.index+2].activities[0].thumbnail) ?
                          this.state.results[0][this.state.index+2].activities[0].thumbnail :
                                "https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/photo-256.png";

    return (
      <div className="Container">
        <button className="btn Back" onClick={this.decreaseIndex.bind(this)}><div id='triangle-left'></div></button>

        <div className='Column'>
          <div className='Title'>{title}</div>
          <div className='Description'>{description}</div>
          <img className='Thumbnail' src={thumbnail} />
        </div>

        <div className='Column'>
          <div className='Title'>{title2}</div>
          <div className='Description'>{description2}</div>
          <img className='Thumbnail' src={thumbnail2} />
        </div>

        <div className='Column'>
          <div className='Title'>{title3}</div>
          <div className='Description'>{description3}</div>
          <img className='Thumbnail' src={thumbnail3} />
        </div>

        <button className="btn Next" onClick={this.increaseIndex.bind(this)}><div id='triangle-right'></div></button>
      </div>
    );
  }
}

export default API;
