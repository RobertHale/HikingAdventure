// App.jsx
import React from   "react";
import Card from    "./card";
import Cards from   "./cards";
import $ from 'jquery';
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      names: [],
      dummy: true

    }
    this.grabdata = this.grabdata.bind(this);
  }


  componentDidMount(){
    this.grabdata();
  }

  grabdata() {
    var n = '';
    var d = '';
    var l = 0;
    var a = 0;
    var descent = 0;

    /*$.getJSON('http://hikingadventures.me/api/trails/7040125')
    .then(real => console.log(real.trails))*/

    /*$.getJSON('https://www.hikingproject.com/data/get-trails-by-id?ids=7040125&key=200217902-4d9f4e11973eb6aa502e868e55361062').then(results => {
      results.trails.map(data => {
        n = data.name;
        d = data.difficulty;
        l = data.length;
        a = data.ascent;
        descent = data.descent;
      });*/

      $.getJSON('https://www.hikingproject.com/data/get-trails?lat=40.5306%20-106.362984&lon=-106.7836&maxDistance=200&maxResults=500&key=200217902-4d9f4e11973eb6aa502e868e55361062')
        .then(practice => practice.trails.map(trail => (
          {
            p_name: trail.name
          }
        )))
        .then(names => this.setState({
          names,

        }))


      //});




  }

  render () {
    var titles = {
      color:'white',
    };

    var center = {
      color: 'white',
      textAlign:'center'
    };


    return (
      <div>
      <div className="container-fluid" styles="background-color: #473c8b;">
      	<p styles='text-align:center'>
      	</p>
      	  <div className="card h-100 cardbg">
      			<div className="card-block">
      				<h1 style={titles} className="card-title" align="center">{this.state.name}</h1>
      			</div>
      	</div>
      	<br></br>

      	<div className="row justify-content-center">
      		<div className="col col-m-3">
      			<h2 style={titles} id="difficultyheader">Difficulty</h2>
      			<var style={titles} id="difficulty"> {this.state.difficulty}</var>
      		</div>
      		<div className="col col-m-3">
      			<h2 style={titles} id="lengthheader">Length</h2>
      			<var style={titles} id="length">{this.state.length} miles</var>
      		</div>
      		<div className="col col-m-3">
      			<h2 style={titles} id="elevationheader">Elevation</h2>
      			<var style={titles} id="ascent">{this.state.ascent} foot ascent</var>
      			<br></br>
      			<var style={titles} id="descent">{this.state.descent} foot descent</var>
      		</div>
      	</div>
      	<br></br>

      	<div className="card h-100 cardbg">
      		<div className="card-title">
      			<br></br>
      			<h2 style= {center} textalign = 'center' id="description">Description</h2>
      		</div>
      		<br></br>
      		<p className="card-text">
      				Flash of Gold is part of an expanding trail network. The lowest part of the trail is moderate with many switchbacks and vistas on the way up or down. Hikers can bask in the scenery as the singletrack travels through the trees, fern groves, and open hillsides. At mile 4.45 the trail meets the Flash of Gold to BTR Connector and the end of the first phase 	 of construction.
      				<br></br>
      				The trail soon transitions to hand-built singletrack where it crosses over Spring Creek. In general, it's rougher technical and more narrow. Ahead, the trail overlaps with FS Road 301 for a series of switchbacks. On hikers right (south), past the third switchback, the trail has been constructed using 2A tax funds generated by hotel room taxes in Steamboat.
      				<br></br>
      				The steady climbing keeps going through big alpine meadows on the south-side of a tree dotted knoll. Around mile 8.3, the trail again overlaps a short section of road to complete a few switchbacks (you can bailout to FS Road 301 by turning left). Pretty soon Flash of Gold heads into the rocks. This final section links several sections of doubletrack with singletrack to deliver hikers to the end of FS Road 306.1A. From there, it's a short hike to connect with FS Road 306 and then to Buffalo Pass Road 60.
      				<br></br>
      		</p>
      	</div>
      	<br></br>
      	<div id="links" className="row justify-content-center">
      		<div className="col-lg-2">
      			<h2 style={titles}>Nearby Resorts:</h2>
      				<a id="resort" className="btn btn-primary" href="/resorts/1">Steamboat</a>
      		</div>
      		<div className="col-lg-2">
      			<h2 style={titles}>Photos:</h2>
      			<a id="photo" className="btn btn-primary" href="/photos/1">Flash of Gold</a>
      		</div>
      	</div>
      	<br></br>
      	<div className="row justify-content-center">
      		<h2 style={titles}> Related Video Content </h2>
      	</div>
      	<div className="row justify-content-center">
      		<iframe width="560" height="315" src="https://www.youtube.com/embed/slSJffakyPc" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      	</div>
      <br></br>
      </div>
      </div>
    );
  }
}