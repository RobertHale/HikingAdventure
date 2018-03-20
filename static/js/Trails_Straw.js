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
      difficulty: "",
      length: 0,
      ascent: 0,
      trailname: "",
      descent: 0
    }
    this.grabdata = this.grabdata.bind(this);
  }

  grabdata() {
    let name = "";
    let lengthvar = 0;
    let ascentvar = 0;
    let descentvar = 0;
    let difficultyvar = "";
    $.getJSON('http://hikingadventures.me/api/trails').then(results => {
      results.map(piece => {
        a = piece.ascent;
        d = piece.descent;
        l = piece.length;
        diff = piece.difficulty;
        n = piece.name;
      });
      if (n === 'North Tenmile Creek'){
        name = n;
        lengthvar = l;
        ascentvar = a;
        difficultyvar = diff;
        descentvar = d;
      }
      this.setState({
        difficulty: difficultyvar,
        length: lengthvar,
        ascent: ascentvar,
        trailname: name,
        descent: descentvar
      });
    });
  }

  componentDidMount(){
    this.grabdata();
  }
  render () {
    return (
      <div>
      <div className="container-fluid" styles="background-color: #473c8b;">
      	<p styles='text-align:center'>
      	</p>
      	  <div className="card h-100 cardbg">
      			<div className="card-block">
      				<h1 className="card-title" align="center">Strawberry Lane</h1>
      			</div>
      	</div>
      	<br></br>

      	<div className="row justify-content-center">
      		<div className="col col-m-3">
      			<h2 id="difficultyheader">Difficulty</h2>
      			<var id="difficulty"> Intermediate</var>
      		</div>
      		<div className="col col-m-3">
      			<h2 id="lengthheader">Length</h2>
      			<var id="length">1.3 miles</var>
      		</div>
      		<div className="col col-m-3">
      			<h2 id="elevationheader">Elevation</h2>
      			<var id="ascent">762 foot ascent</var>
      			<br></br>
      			<var id="descent">-47 foot descent</var>
      		</div>
      	</div>
      	<br></br>

      	<div className="card h-100 cardbg">
      		<div className="card-title">
      			<br></br>
      			<h2 styles="text-align:center" id="description">Description</h2>
      		</div>
      		<br></br>
      		<div className="card-block">
      			<p className="card-text">
      			This alternate start to the Berry Picker Trail leaves from the Vail Village Gondola One base. Head up steeply through aspen groves and cross small streams, sometimes on bridges sometimes not. This lower part of Strawberry Lane is rooty and can be slick so watch your footing.
      			<br></br>
      			Cross ski runs and enjoy wildflowers as the trail gains altitude, finally passing a snow-making pond on the right. Instead of heading down towards the snowmaking pond, keep left and after another couple of turns, finally arrive at the junction with Berry Picker from the Lionshead base area.
      			</p>
      		</div>
      	</div>
      	<br></br>
      	<div id="links" className="row justify-content-center">
      		<div className="col-lg-2">
      			<h2>Nearby Resorts:</h2>
      				<a id="resort" className="btn btn-primary" href="/resorts/2">Vail</a>
      		</div>
      		<div className="col-lg-2">
      			<h2>Photos:</h2>
      			<a id="photo" className="btn btn-primary" href="/photos/2">Photos</a>
      		</div>
      	</div>
      	<br></br>
      	<div className="row justify-content-center">
      		<h2> Related Video Content </h2>
      	</div>
      	<div className="row justify-content-center">
      		<iframe width="560" height="315" src="https://www.youtube.com/embed/sFQ098bh-ds" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      	</div>
      </div>


      </div>
    );
  }
}
