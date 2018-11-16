import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import MainView from '../main_view';
import { htmlParser } from '../../actions'


class SearchResults extends Component {

  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
      btnReset: false,
      mounted: false,
      thumbnail_1: null,
      thumbnail_2: null,
      thumbnail_3: null,
      animateUp: false,
      animateDown: false
    }

    // bindings

    //refs
    this.mainView = React.createRef();
    this.scrollContainer = React.createRef();
    this.back = React.createRef();
    this.dotRef = React.createRef();
    this.backRef = React.createRef();
    this.nextRef = React.createRef();
    this.rowRef = React.createRef();

  }
  componentDidMount() {
    if (!this.props.apiArr) return null;
    const results = this.props.apiArr.results[0];
    if (results){
      if (results.length > 3) this.updatePhoto();
    }
  }

  updatePhoto(){
    const { index } = this.state;
    setTimeout(()=>this.colorDots());
    const results = this.props.apiArr.results[0];
    this.setState({thumbnail_1: null});
    this.setState({thumbnail_2: null});
    this.setState({thumbnail_3: null});
    if (results[index].activities[0]){
      if (results[index].activities[0].thumbnail){
        this.setState({thumbnail_1:<img alt='thumbnail' className='Thumbnail'
        src={results[index].activities[0].thumbnail} />});
      }
    }

    if (results[index+1].activities[0]){
      if (results[index+1].activities[0].thumbnail){
        this.setState({thumbnail_2:<img alt='thumbnail' className='Thumbnail'
        src={results[index+1].activities[0].thumbnail} />});
      }
    }

    if (results[index+2].activities[0]){
      if (results[index+2].activities[0].thumbnail){
        this.setState({thumbnail_3:<img alt='thumbnail' className='Thumbnail'
        src={results[index+2].activities[0].thumbnail} />});
      }
    }
  }

  slideLeft(e) {
    this.disableBtns();
    let animation = (e.target.className.includes('Next')) ?
      animation = 'SlideLeft 1s' :
      animation = 'SlideLeft 1s reverse ease-in-out';

    this.rowRef.current.style.animation = animation;
    setTimeout(()=>this.rowRef.current.style.animation = 'none', 1000);

    if (e.target.className.includes('Next')) this.increaseIndex();
    else this.decreaseIndex();

  }
  increaseIndex(){
    setTimeout(()=>{
      (this.state.index < this.props.apiArr.results[0].length-6) ?
      this.setState({index: this.state.index+3}) :
      this.setState({index: 0});
      this.updatePhoto();
    }, 300);
  }
  decreaseIndex() {
    setTimeout(()=>{
        (this.state.index === 0) ?
        this.setState({index: this.props.apiArr.results[0].length-5}) :
        this.setState({index: this.state.index-3});
        this.updatePhoto();
    }, 600);
  }

  disableBtns(){
    const backRef = this.backRef.current;
    const nextRef = this.nextRef.current;
    nextRef.disabled = true;
    backRef.disabled = true;
    setTimeout(()=>{
      nextRef.disabled = false;
      backRef.disabled = false;
    }, 1000);
    this.setState({btnReset: true});
  }
  colorDots(){
    const arr = document.getElementsByClassName('dot');
    for (let i = 0; i < arr.length; i++){
      arr[i].style.color = 'black';
    }
    arr[Math.floor(this.state.index/3)].style.color = 'white';

  }

  drawDots() {
    let dots = [];
    const results = this.props.apiArr.results[0];
    for (let i = 0; i < Math.floor(results.length / 3); i++){
      dots.push(<div key={i} className="dot glyphicon glyphicon-unchecked"></div>)
    }
    return (<div ref={this.dotRef}className='dots'>{dots}</div>);
  }

  handleMovement(e){
    const MV = ReactDOM.findDOMNode(this.mainView.current);
    const SV = ReactDOM.findDOMNode(this.scrollContainer.current);
    const btn = ReactDOM.findDOMNode(this.back.current);
    const dot = ReactDOM.findDOMNode(this.dotRef.current);

    let main = 0;
    let cont = 0;
    if (e.target.className === 'ClickMe'){
      main = 1;
      cont = 0;
    }
    else {
      cont = 1;
      main = 0;
    }
    btn.style.opacity = main;
    MV.style.opacity = main;
    MV.style.zIndex = main;
    SV.style.opacity = cont;
    SV.style.zIndex = cont;
    dot.style.opacity = cont;
  }


  handleClick(e){
    const { results } = this.props.apiArr
    const name = (e.target.parentNode.firstChild) ? e.target.parentNode.firstChild.innerText : null;
    let idx = -1;

    for (let i = 0; i < results[0].length; i++){
      if (results[0][i].name === name) idx = i;
    }

    if (name && idx !== -1) {
      this.props.getActive(name, idx);
      this.handleMovement(e);
    }
  }



  render() {
    if (!this.props.apiArr) return null;
    const results = this.props.apiArr.results[0];// it should be results[0] with real api
    if (!results) return <div className='NoRes'>NO RESULTS FOUND</div>;
    else if (results.length < 3) return <div className='NoRes'>NO RESULTS FOUND</div>;
    else {
      // variables
      let title = results[this.state.index].name,
          title2 = results[this.state.index+1].name,
          title3 = results[this.state.index+2].name;

      return (
        <div className="Container">
        <div className='ScrollContainer' ref={this.scrollContainer}>
        <button className="btn Back" ref={this.backRef} onClick={this.slideLeft.bind(this)}></button>
        <div className='Row' ref={this.rowRef}>
        <div className='Column' onClick={this.handleClick.bind(this)}>
        <div className='Title'>{htmlParser(title)}</div>
        <div className='ClickMe'>Click for more details!</div>
        </div>

        <div className='Column' onClick={this.handleClick.bind(this)}>
        <div className='Title'>{htmlParser(title2)}</div>
        {this.state.thumbnail_2}
        <div className='ClickMe'>Click for more details!</div>
        </div>

        <div className='Column' onClick={this.handleClick.bind(this)}>
        <div className='Title'>{htmlParser(title3)}</div>
        {this.state.thumbnail_3}
        <div className='ClickMe'>Click for more details!</div>
        </div>
        </div>
        <button className="btn Next" ref={this.nextRef} onClick={this.slideLeft.bind(this)}></button>
        </div>
        {this.drawDots()}
        <button className='BackBtn'  onClick={this.handleMovement.bind(this)} ref={this.back}>Back</button>
        <MainView ref={this.mainView}/>
        </div>
    );
  }
  }
}

export default SearchResults;
