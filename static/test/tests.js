
import React from 'react';
import ReactDOM from 'react-dom';
import About from '../js/About';
import Resorts from '../js/Resorts';
import ResortRow from '../js/ResortRow';
import ResortInstance from '../js/ResortInstance';
import Trails from '../js/Trails';
import TrailRow from '../js/TrailRow';
import TrailInstance from '../js/TrailInstance';
import Photos from '../js/Photos';
import PhotoRow from '../js/PhotoRow';
import PhotoInstance from '../js/PhotoInstance';
import Home from '../js/Home';
import { mount, shallow } from 'enzyme';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import $ from 'jquery';
//var assert = require('assert');


const modelpage = {'params': {'page': 'page= 3'}}
const resortdata = {
      "elev": 3487,
      "id": 497,
      "lat": 39.6045,
      "lifts": 16,
      "lon": -106.53,
      "mapid": 13902,
      "mapurl": "https://skimap.org/data/497/2798/1517329966jpg_render.jpg",
      "name": "Beaver Creek Resort",
      "reviewcount": 135,
      "runs": 148,
      "website": "https://www.beavercreek.com/",
      "yelprating": 4.5,
      "youtubeid": "Lg5sKQpa1sw"
    };
const traildata = {
      "ascent": 899,
      "condition": null,
      "descent": -56,
      "difficulty": "greenBlue",
      "id": 7000032,
      "lat": 39.5759,
      "length": 3.4,
      "lon": -106.114,
      "name": "North Tenmile Creek",
      "starVotes": 7,
      "stars": 4,
      "summary": "This serene valley ramble offers subtle views and the creek for company.",
      "youtubeid": "m3-lrVNPpNA"
    };
const photodata = {
      "id": 7000032,
      "lat": 39.5759,
      "lon": -106.114,
      "name": "North Tenmile Creek photo",
      "trail": {
        "ascent": 899,
        "condition": null,
        "descent": -56,
        "difficulty": "greenBlue",
        "id": 7000032,
        "lat": 39.5759,
        "length": 3.4,
        "lon": -106.114,
        "name": "North Tenmile Creek",
        "starVotes": 7,
        "stars": 4,
        "summary": "This serene valley ramble offers subtle views and the creek for company.",
        "youtubeid": "m3-lrVNPpNA"
      },
      "trailid": 7000032,
      "url": "https://cdn-files.apstatic.com/hike/7000128_medium_1417582072.jpg"
    };
  const mixeddata = {
      "lat": 0,
      "lon": 0,
      "elev": 0,
      "trailid": 0,
      "youtubeid": null,
      "summary": "",
      "length": "",
      "name": "",
      "id" : 0,
      "url": null,
      "difficulty": "",
      "lifts": 0
  };

describe('Home Page', function() {
  it('Carousel Mounted', function() {
    const homepage = shallow(<Home />);
    expect(homepage.find('.Homecarousel').exists()).to.eql(true);
  });
});

describe('Resort Instance', function() {
  const resortinstance = shallow(<ResortInstance resort={resortdata} />);
  it('Resort Card Generated', function() {
    expect(resortinstance.find('.mt-4').exists()).to.eql(true);
  });
  it('Resort Video Url', function() {
    const {src} = resortinstance.find('iframe').props();
    assert.equal(src, "http://www.youtube.com/embed/Lg5sKQpa1sw");
  });
  const mresortinstance = shallow(<ResortInstance resort={mixeddata} />);
  it('Trail Video Url with no data', function() {
    const {src} = mresortinstance.find('iframe').props();
    assert.equal(src, "");
  });
});

describe('Trail Instance', function() {
  const trailinstance = shallow(<TrailInstance trail={traildata} />);
  it('Trail Card Generated', function() {
    expect(trailinstance.find('.mt-4').exists()).to.eql(true);
  });
  it('Trail Video Url', function() {
    const {src} = trailinstance.find('iframe').props();
    assert.equal(src, "http://www.youtube.com/embed/m3-lrVNPpNA");
  });
  const mtrailinstance = shallow(<TrailInstance trail={mixeddata} />);
  it('Trail Video Url with no data', function() {
    const {src} = mtrailinstance.find('iframe').props();
    assert.equal(src, "");
  });

});

describe('Photo Instance', function() {
  const photoinstance = shallow(<PhotoInstance photo={photodata} />);
  it('Photo Card Generated', function() {
    expect(photoinstance.find('.mt-4').exists()).to.eql(true);
  });
  it('Photo photo Url', function() {
    const {src} = photoinstance.find('CardImg').props();
    assert.equal(src, "https://cdn-files.apstatic.com/hike/7000128_medium_1417582072.jpg");
  });
  const mphotoinstance = shallow(<PhotoInstance photo={mixeddata} />);
  it('Photo photo Url with no data', function() {
    const {src} = mphotoinstance.find('CardImg').props();
    assert.equal(src, "Unknown");
  });


});

describe('Models', function() {

  const resorts = mount(<Resorts match={modelpage}/>);
  const photos = mount(<Photos match={modelpage}/>);
  it('Resorts Mounts with Proper Data from React-Router', function() {
    const resorts = mount(<Resorts match={modelpage}/>);
  });
  it('Photos Mounts with Proper Data from React-Router', function() {
    const photos = mount(<Photos match={modelpage}/>);
  });
  it('Trails Mounts with Proper Data from React-Router', function() {
    const trails = mount(<Trails match={modelpage}/>);
  });
});





// describe('Load', function() {
//   it('run home page', function() {
//     const div = document.createElement('div');
//     ReactDOM.render(<Home />, div);
//   });
// });
//
// describe('API', function() {
//   it('run about page', function() {
//     const aboutpage = mount(<About/>);
//     //var Mockdata = sinon.stub(Mockdata, 'then');
//     var apicall = sinon.stub($, 'getJSON');
//     function response(){
//       var temp = $.Deferred();
//       temp.then([{"davepcast":{"commits": 1, "issues": 1, "tests": 1}}]);
//       return temp.promise();
//     };
//     apicall.returns(response());
//   });
// });
//
// describe('API', function() {
//   it('empty test should run successfully', function() {
//     const div = document.createElement('div');
//     ReactDOM.render(<Resorts match={{'params': {'page': 'page= 1'}}} />, div);
//   });
// });
