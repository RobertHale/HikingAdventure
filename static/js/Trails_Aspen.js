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
      name: "",
      difficulty: "",
      length: 0,
      ascent: 0,
      descent: 0

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

    $.getJSON('https://www.hikingproject.com/data/get-trails-by-id?ids=7039505&key=200217902-4d9f4e11973eb6aa502e868e55361062').then(results => {
      results.trails.map(data => {
        n = data.name;
        d = data.difficulty;
        l = data.length;
        a = data.ascent;
        descent = data.descent;
      });

      if (d == "blueBlack") {
        d = "Intermediate"
      }
      this.setState({
        name: n,
        difficulty: d,
        length: l,
        ascent: a,
        descent: descent

      });

    });

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
      			<h2 style={center} id="description">Description</h2>
      		</div>
      		<br></br>
      		<p className="card-text">
      			From the Boreas Pass winter trailhead, go south past the gate and look for a singletrack on the west side of the road. The trail has been recently (2014) realigned and features numerous switchbacks through a beautiful aspen grove.
      			<br></br>
      			The trail terminates at a gravel driveway on the lower section of Boreas Pass Road (paved). Take a right on the driveway back to Boreas Pass Road and climb back to the trailhead. Utilize Illinois Gulch Road to short-cut the climb back to the trailhead.
              </p>
      	</div>
      	<br></br>
      	<div id="links" className="row justify-content-center">
      		<div className="col-lg-2">
      			<h2 style={titles}>Nearby Resorts:</h2>
      				<a id="resort" className="btn btn-primary" href="/resorts/3">Breckenridge</a>
      		</div>
      		<div className="col-lg-2">
      			<h2 style={titles}>Photos:</h2>
      			<a id="photo" className="btn btn-primary" href="/photos/3">Photos</a>
      		</div>
      	</div>
      	<br></br>
      	<div className="row justify-content-center">
      		<h2 style={titles}> Related Video Content </h2>
      	</div>
      	<div className="row justify-content-center">
      		<iframe width="560" height="315" src="https://www.youtube.com/embed/sFQ098bh-ds" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      	</div>
      <br></br>
      </div>

      </div>
    );
  }
}
