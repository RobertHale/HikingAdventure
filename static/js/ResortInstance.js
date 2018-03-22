<<<<<<< HEAD
// Card instance of Resort
import React from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { Link } from "react-router-dom";

export default class ResortInstance extends React.Component {
  render () {
    let name = "Unknown";
    let mylink = "Unknown";
    let video = "";
    let lifts = "Unknown";
    let elevation = "Unknown";
    let latitude = "Unknown";
    let longitude = "Unknown";

    if(this.props.resort){
      name = this.props.resort.name;
      mylink = "/resorts/" + (this.props.resort.id).toString();
      if(this.props.resort.youtubeid != null){
        video = "http://www.youtube.com/embed/" + this.props.resort.youtubeid;
      }
      if(this.props.resort.lifts != null){
        lifts = this.props.resort.lifts;
      }
      if(this.props.resort.elev != null){
        elevation = this.props.resort.elev;
      }
      if(this.props.resort.lat != null){
        latitude = this.props.resort.lat;
      }
      if(this.props.resort.lon != null){
        longitude = this.props.resort.lon;
      }
  }

    return (
      <Col lg="6" sm="12">
      <Card className="mt-4">
      <iframe src={video} width="100%" height="316" frameBorder="0" allowFullScreen></iframe>
      <CardBody>
      <CardTitle><Link to={mylink}>{name}</Link></CardTitle>
      <CardText>
      <ul>
      <li className="proplifts">{"Number of Lifts: "}{lifts}</li>
      <li className="propelev">{"Elevation: "}{elevation}</li>
      <li className="proplat">{"Latitude: "}{latitude}</li>
      <li className="proplon">{"Longitude: "}{longitude}</li>
      </ul>
      </CardText>
      </CardBody>
      </Card>
      </Col>
=======
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
    var n = '';
    var e = 0;
    var r = 0;
    var l = 0;
    var rev = 0;
    var lat = 0;
    var lon = 0;
    var y = 0;
    var w = '';
    var m = '';
    var p = 0;
    var pn = '';
    var t = 0;
    var tn = '';

    var url = window.location.href;
    var lastPart = url.split("/").pop();

    var fetchfrom = "http://hikingadventures.me/api/resorts/" + lastPart;

    var fetchPhotos = "http://hikingadventures.me/api/resorts/" + lastPart + "/photos?results_per_page=25";

    var fetchTrails = "http://hikingadventures.me/api/resorts/" + lastPart + "/trails?results_per_page=25";

    console.log(fetchfrom)

    $.getJSON(fetchfrom)
      .then(results => {
        n = results.name;
        e = results.elev;
        r = results.runs;
        l = results.lifts;
        rev = results.reviewcount;
        lat = results.lat;
        lon = results.lon;
        y = results.yelprating;
        w = results.website;
        m = results.mapurl;

        this.setState({
          name: n,
          elevation: e,
          runs: r,
          lifts: l,
          reviews: rev,
          lat: lat,
          lon: lon,
          yelp: y,
          website: w,
          map: m

        });

      });

      $.getJSON(fetchPhotos)
        .then(results => {

          var pad = {
            margin: '0px 0px 10px 0px'
          };

          let photos = results.objects.map((photo)=>{
            return(
              <a style={pad} className="btn btn-primary" href={"/photos/"+photo.id}>{photo.name}</a>
            )
          })

          this.setState({
            photos: photos

          });

        });

        $.getJSON(fetchTrails)
          .then(results => {

            var pad = {
              margin: '0px 0px 10px 0px'
            };

            let trails = results.objects.map((trail)=>{
              return(
                <a style={pad} className="btn btn-primary" href={"/trails/"+trail.id}>{trail.name}</a>
              )
            })

            this.setState({
              trails: trails

            });

          });
  }

  render () {

    var titles = {
      color:'white',
    };

    var left = {
      color: 'white',
      textAlign:'left'
    };

    return (
      <div>
      <div id="title" className="row align-items-center">
  			<div className="col-12">
  				<h1 style={titles} id="name">{this.state.name}</h1>
          <br></br>
  			</div>
  		</div>

      <div className="row">
        <div id="main" className="col-lg-6">
          <div className="card cardbg">
            <img className="card-img-top" src={this.state.map} height="500" />
            <div className="card-block">
              <ul>
                <li>
                  <h2 style={left} id="latitude" className="card-title">
                    Latitude: {this.state.lat}
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="longitude" className="card-title">
                    Longitude: {this.state.lon}
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="elev" className="card-title">
                    Elevation at Peak (meters): {this.state.elevation}
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="runs" className="card-title">
                    Total Ski Runs: {this.state.runs}
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="lifts" className="card-title">
                    Total Lifts: {this.state.lifts}
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="review" className="card-title">
                    Reviews: {this.state.yelp} Stars from {this.state.reviews} Reviews
                  </h2>
                </li>
              </ul>
              <form id="web_link" action={this.state.website}>
                  <input type="submit" className="btn btn-primary" value="Website" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card cardbg h-10">
            <div className="card-block">
              <h2 style={titles} className="card-title">Nearby Trails:</h2>
              {this.state.trails}
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card cardbg h-10">
            <div className="card-block">
              <h2 style={titles} className="card-title">Photos:</h2>
              {this.state.photos}
            </div>
          </div>
        </div>
      </div>


      </div>
>>>>>>> master
    );
  }
}
