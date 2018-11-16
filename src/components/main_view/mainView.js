import React, { Component } from 'react';
import './styles.css';
import { htmlParser } from '../../actions'


class MainView extends Component {

  constructor(){
    super();
    this.state = {
      apiArr: '',
      element: '',
      index: undefined
    }
  }

  render() {
    const { active, results, index } = this.props.apiArr;
    const el = results[0][index];
    const googImg = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/GoogleMaps.svg/1200px-GoogleMaps.svg.png'
    let pic = 'https://www.strategemarketing.com/tester/img/not-available.png';
    let description;
    let directs;
    let googURL;;
    let moreInfoURL;;
    if (el) {
      const { activities, directions, lat, lon } = el;
      if (activities[0]){
        if (activities[0].thumbnail) pic = activities[0].thumbnail;
        description = (activities[0].description) ? activities[0].description : 'No description found';
        directs = (directions) ? directions : 'No directions found'
        googURL = `https://maps.google.com/?ll=${lat},${lon}`;
        moreInfoURL = activities[0].url;
      }
      else description = `We are sorry. We were unable to find any information on ${active}.`;
    }
      return (
        <div className='MainViewContainer'>
          <div className='title'>{htmlParser(active)}</div>
          <div className='pic'>
            <img src={pic} alt=""/>
          </div>
          <div className='direct'>
            <div className='heading'>Directions:</div>
            <hr></hr>
            <div className='more'>{htmlParser(directs)}</div>
          </div>
          <div className='descript'>
            <div className='heading'>Description:</div>
            <hr></hr>
            <div className='more'>{htmlParser(description)}</div>
          </div>
          <div className='google'>
            <div className='heading'>More:</div>
            <hr></hr>
            <div className='more icons'>
              <a href={googURL} target="_blank">
                <img src={googImg} alt='google maps'/>
              </a>
              <a href={moreInfoURL} target="_blank">
                <img className='moreInfo' src={'http://www.endlessicons.com/wp-content/uploads/2014/01/mountain-icon-1.png'} alt='External Link'/>
              </a>
            </div>
          </div>
        </div>
      )
  }
}
export default MainView;
