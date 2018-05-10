import React, { Component } from 'react';
import './style.css';

class API extends Component {

  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
      btnReset: false,
      mounted: false,
      thumbnail_1: null,
      thumbnail_2: null,
      thumbnail_3: null
    }
  }
  componentDidMount() {
    this.updatePhoto();
  }
  updatePhoto(){
    const results = this.props.apiArr.results[0];
    this.setState({thumbnail_1: null});
    this.setState({thumbnail_2: null});
    this.setState({thumbnail_3: null});
    if (results[this.state.index].activities[0].thumbnail){
      this.setState({thumbnail_1:<img alt='thumbnail' className='Thumbnail'
                      src={results[this.state.index].activities[0].thumbnail} />});
    }
    if (results[this.state.index+1].activities[0].thumbnail){
      this.setState({thumbnail_2:<img alt='thumbnail' className='Thumbnail'
                      src={results[this.state.index+1].activities[0].thumbnail} />});
    }
    if (results[this.state.index+2].activities[0].thumbnail){
      this.setState({thumbnail_3:<img alt='thumbnail' className='Thumbnail'
                      src={results[this.state.index+2].activities[0].thumbnail} />});
    }
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
      (this.state.index < this.props.apiArr.results[0].length-6) ?
      this.setState({index: this.state.index+3}) :
      this.setState({index: 0});
      this.updatePhoto();
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
        this.setState({index: this.props.apiArr.results[0].length-5}) :
        this.setState({index: this.state.index-3});
        this.updatePhoto();
    }, 600);
  }

  render() {
    const results = this.props.apiArr.results[0];

    // variables
    let title = results[this.state.index].name;
    let title2 = results[this.state.index+1].name;
    let title3 = results[this.state.index+2].name;

    return (
      <div className="Container">
        <button className="btn Back" onClick={this.decreaseIndex.bind(this)}><div id='triangle-left'></div></button>

        <div className='Column'>
          <div className='Title'>{title}</div>
          {this.state.thumbnail_1}
          <div className='ClickMe'>Click for more details!</div>
        </div>

        <div className='Column'>
          <div className='Title'>{title2}</div>
          {this.state.thumbnail_2}
          <div className='ClickMe'>Click for more details!</div>
        </div>

        <div className='Column'>
          <div className='Title'>{title3}</div>
          {this.state.thumbnail_3}
          <div className='ClickMe'>Click for more details!</div>
        </div>

        <button className="btn Next" onClick={this.increaseIndex.bind(this)}><div id='triangle-right'></div></button>
      </div>
    );
  }
}

export default API;
