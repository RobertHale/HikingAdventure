// App.jsx
import React from   "react";
import $ from 'jquery';
import NavBar from "./Navbar";
import {
  Container} from 'reactstrap';
export default class ResortInstance extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "",
      elevation: 0,
      runs: 0,
      lifts: 0,
      reviews: 0,
      lat: 0,
      lon: 0,
      yelp: 0,
      website: "",
      map: "",
      photos: 0,
      trails: 0
    };

    this.grabdata = this.grabdata.bind(this);
  }

  componentDidMount(){
    this.grabdata();
  }
  grabdata() {
    const url = window.location.href;
    const lastPart = url.split("/").pop();
    const fetchfrom = "http://hikingadventures.me/api/resorts/" + lastPart;
    const fetchPhotos = "http://hikingadventures.me/api/resorts/" + lastPart + "/photos?results_per_page=25";
    const fetchTrails = "http://hikingadventures.me/api/resorts/" + lastPart + "/trails?results_per_page=25";
    console.log(fetchfrom);

    $.getJSON(fetchfrom)
      .then(results => {

        this.setState({
          name: results.name,
          elevation: results.elev,
          runs: results.runs,
          lifts: results.lifts,
          reviews: results.reviewcount,
          lat: results.lat,
          lon: results.lon,
          yelp: results.yelprating,
          website: results.website,
          map: results.mapurl
        });
      });

      $.getJSON(fetchPhotos)
        .then(results => {

            const pad = {
                margin: '0px 5px 10px 0px'
            };

            let photos = results.objects.map((photo)=>{
            return(
              <li>
                <a style={pad} className="btn btn-primary" href={"/photos/"+photo.id}>{photo.name}</a>
              </li>
            )
          });
          this.setState({
            photos: photos
          });
        });

        $.getJSON(fetchTrails)
          .then(results => {

              const pad = {
                  margin: '0px 5px 10px 0px'
              };

              let trails = results.objects.map((trail)=>{
              return(
                <li>
                  <a style={pad} className="btn btn-primary" href={"/trails/"+trail.id}>{trail.name}</a>
                </li>
              )
            });
            this.setState({
              trails: trails
            });
          });
  }

  render () {

      const titles = {
          color: 'white',
          textAlign: 'center'
      };

      const left = {
          color: 'white',
          textAlign: 'left',
          display: 'inline'
      };

      const cardpad = {
          margin: '0px 0px 10px 0px'
      };

      return (
      <div>
      <NavBar/>
      <Container>
      <div id="title" className="row align-items-center">
  			<div className="col-12">
  				<h1 style={titles} id="name">{this.state.name}</h1>
          <br/>
  			</div>
  		</div>

      <div className="row justify-content-center">
        <div id="main" className="col-lg-7">
          <div style={cardpad} className="card cardbg">
            <img className="card-img-top" src={this.state.map} height="500" />
            <div className="card-block">
              <ul>
                <li>
                  <h2 style={left} id="latitude" className="card-title">Latitude:</h2>
                  <h4 style={left}> {this.state.lat} </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="longitude" className="card-title">Longitude:</h2>
                    <h4 style={left}> {this.state.lon} </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="elev" className="card-title">Elevation at Peak (meters):</h2>
                    <h4 style={left}> {this.state.elevation} </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="runs" className="card-title">Total Ski Runs:</h2>
                    <h4 style={left}> {this.state.runs} </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="lifts" className="card-title">Total Lifts:</h2>
                    <h4 style={left}> {this.state.lifts} </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="review" className="card-title"></h2>
                    <h4 style={left}> {this.state.yelp} Stars from {this.state.reviews} Reviews </h4>
                </li>
                <br/>
                <li>
                  <form id="web_link" action={this.state.website}>
                      <input type="submit" className="btn btn-primary" value="Website" />
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div style={cardpad} className="card cardbg h-10">
              <div className="card-block">
                <h2 style={titles} className="card-title">Nearby Trails:</h2>
                <nav>
                <ul className="resort-scroll">
                {this.state.trails}
                </ul>
                </nav>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div style={cardpad} className="card cardbg h-10">
              <div className="card-block">
                <h2 style={titles} className="card-title">Photos:</h2>
                <nav>
                <ul className="resort-scroll">
                {this.state.photos}
                </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

      </div>

      </Container>
      </div>
    );
  }
}
