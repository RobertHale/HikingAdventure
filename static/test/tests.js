
import React from 'react';
import ReactDOM from 'react-dom';
import About from '../js/About';
import Resorts from '../js/Resorts';
import ResortRow from '../js/ResortRow';
import ResortCard from '../js/ResortCard';
import ResortInstance from '../js/ResortInstance';
import Trails from '../js/Trails';
import TrailRow from '../js/TrailRow';
import TrailCard from '../js/TrailCard';
import TrailInstance from '../js/TrailsInstance';
import Photos from '../js/Photos';
import PhotoRow from '../js/PhotoRow';
import PhotoCard from '../js/PhotoCard';
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

describe('Resort Card', function() {
  const resort = shallow(<ResortCard resort={resortdata} />);
  it('Resort Card Generated', function() {
    expect(resort.find('.mt-4').exists()).to.eql(true);
  });
  it('Resort Video Url', function() {
    const {src} = resort.find('iframe').props();
    assert.equal(src, "http://www.youtube.com/embed/Lg5sKQpa1sw");
  });
  const mresort = shallow(<ResortCard resort={mixeddata} />);
  it('Trail Video Url with no data', function() {
    const {src} = mresort.find('iframe').props();
    assert.equal(src, "");
  });
});

describe('Trail Card', function() {
  const trail = shallow(<TrailCard trail={traildata} />);
  it('Trail Card Generated', function() {
    expect(trail.find('.mt-4').exists()).to.eql(true);
  });
  it('Trail Video Url', function() {
    const {src} = trail.find('iframe').props();
    assert.equal(src, "http://www.youtube.com/embed/m3-lrVNPpNA");
  });
  const mtrail = shallow(<TrailCard trail={mixeddata} />);
  it('Trail Video Url with no data', function() {
    const {src} = mtrail.find('iframe').props();
    assert.equal(src, "");
  });

});

describe('Photo Card', function() {
  const photo = shallow(<PhotoCard photo={photodata} />);
  it('Photo Card Generated', function() {
    expect(photo.find('.mt-4').exists()).to.eql(true);
  });
  it('Photo photo Url', function() {
    const {src} = photo.find('CardImg').props();
    assert.equal(src, "https://cdn-files.apstatic.com/hike/7000128_medium_1417582072.jpg");
  });
  const mphoto = shallow(<PhotoCard photo={mixeddata} />);
  it('Photo photo Url with no data', function() {
    const {src} = mphoto.find('CardImg').props();
    assert.equal(src, "Unknown");
  });


});

describe('Models', function() {
  // Spy on model pages function 'componentDidMount' which should be called when component mounts
  sinon.spy(Resorts.prototype, 'componentDidMount');
  sinon.spy(Photos.prototype, 'componentDidMount');
  sinon.spy(Trails.prototype, 'componentDidMount');

  it('Resorts Mounts with Proper Data from React-Router', function() {
    const resorts = mount(<Resorts match={modelpage}/>);
  });
  it('Photos Mounts with Proper Data from React-Router', function() {
    const photos = mount(<Photos match={modelpage}/>);
  });
  it('Trails Mounts with Proper Data from React-Router', function() {
    const trails = mount(<Trails match={modelpage}/>);
  });

  it('Resort componentDidMount called', function() {
    expect(Resorts.prototype.componentDidMount.calledOnce).to.equal(true);
  });
  it('Photos componentDidMount called', function() {
    expect(Photos.prototype.componentDidMount.calledOnce).to.equal(true);
  });
  it('Trails componentDidMount called', function() {
    expect(Trails.prototype.componentDidMount.calledOnce).to.equal(true);
  });

});

describe('Instances', function() {
  // Spy on model pages function 'componentDidMount' which should be called when component mounts
  sinon.spy(ResortInstance.prototype, 'componentDidMount');
  sinon.spy(PhotoInstance.prototype, 'componentDidMount');
  sinon.spy(TrailInstance.prototype, 'componentDidMount');

  it('ResortInstance Mounts', function() {
    const resorts = mount(<ResortInstance/>);
  });
  it('PhotoInstance Mounts', function() {
    const photos = mount(<PhotoInstance/>);
  });
  it('TrailInstance Mounts', function() {
    const trails = mount(<TrailInstance/>);
  });

  it('Resort componentDidMount called', function() {
    expect(ResortInstance.prototype.componentDidMount.calledOnce).to.equal(true);
  });
  it('Photos componentDidMount called', function() {
    expect(PhotoInstance.prototype.componentDidMount.calledOnce).to.equal(true);
  });
  it('Trails componentDidMount called', function() {
    expect(TrailInstance.prototype.componentDidMount.calledOnce).to.equal(true);
  });

});
