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

export default class PhotoRow extends React.Component {
  render () {
    let name = "Unknown";
    let mylink = "Unknown";
    let image = "Unknown";
    let longitude = "Unknown";
    let latitude = "Unknown";
    let id = "Unknown";

    if(this.props.photo){
      name = this.props.photo.name;
      mylink = "/photos/" + (this.props.photo.id).toString();
      if(this.props.photo.url != null){
        image = this.props.photo.url;
      }
      if(this.props.photo.lat != null){
        latitude = this.props.photo.lat;
      }
      if(this.props.photo.lon != null){
        longitude = this.props.photo.lon;
      }
      if(this.props.photo.trailid != null){
        id = this.props.photo.trailid;
      }
    }

    return (
      <Col lg="6" sm="12">
      <Card className="mt-4">
      <CardImg top width="100%" src={image} alt="Missing" />
      <CardBody>
      <CardTitle><Link to={mylink}>{name}</Link></CardTitle>
      <CardText>
      <ul>
      <li>{"Latitude: "}{latitude}</li>
      <li>{"Longitude: "}{longitude}</li>
      <li>{"Nearby Trail Id: "}{id}</li>
      </ul>
      </CardText>
      </CardBody>
      </Card>
      </Col>
    );
  }
}
=======
// App.jsx
import React from   "react";
import Cards from   "./cards";
import $ from 'jquery';
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
import tether from 'tether';
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "",
      url: "",
      lat: "",
      lon: "",
      trailid: "",
      list: 0

    }
    this.grabdata = this.grabdata.bind(this);
  }


  componentDidMount(){
    this.grabdata();
  }


  grabdata() {
    var n = 'ffjjffj';
    var u = '';
    var lat = '';
    var lon = '';
    var trailid = '';

    var url = window.location.href;
    var lastPart = url.split("/").pop();

    var fetchfrom = "http://hikingadventures.me/api/photos/" + lastPart


    $.getJSON(fetchfrom)
      .then(results => {
        n = results.name;
        u = results.url;
        lat = results.lat;
        lon = results.lon;
        trailid = results.trailid;

        this.setState({
          name: n,
          url: u,
          lat: lat,
          lon: lon,
          trailid: trailid


        });

      });



      var fetchresort = fetchfrom + "/resorts";

      $.getJSON(fetchresort)
        .then(results => {
          let list = results.objects.map((resorts)=>{
            return (
              <a className="btn btn-primary" href={"http://hikingadventures.me/resorts/" + resorts.id}>{resorts.name}</a>

            )

          })

          this.setState({
            list:list


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
      <Row>
      <h1 id="name">{this.state.name}</h1><br></br>
      </Row>

      <Row>
      <Col lg="5" sm="10">
      <Card className="mt-4">
      <img src={this.state.url} />
      </Card>
      </Col>


      <Col lg="5" sm="10">
      <Card className="mt-4">
      <iframe width="600" height="450" src={"https://www.google.com/maps/embed/v1/view?key=AIzaSyDRwflQaI1Zq5bqKVQJ2YBDHb7l7oD1L2o&center=" + this.state.lat + "," + this.state.lon + "&zoom=18&maptype=satellite"}></iframe>
      </Card>
      </Col>
      </Row>

      <Row>
      <div className="col-lg-6">
      <Card className="mt-4">
      <CardBody>
      <h2 style={titles}>Link to Trail:</h2>
      <a id="photo" className="btn btn-primary" href={"http://hikingadventures.me/trails/" + this.state.trailid}>Trail</a>
      </CardBody>
      </Card>
      </div>

      <div className="col-lg-6">
      <Card className="mt-4">
      <CardBody>
      <h2 style={titles}>Link to Resorts:</h2>
      {this.state.list}
      </CardBody>
      </Card>
      </div>



      </Row>

      </div>
    );
  }
}
>>>>>>> master
