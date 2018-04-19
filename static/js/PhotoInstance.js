// App.jsx
import React from   "react";
import Cards from   "./cards";
import $ from 'jquery';
import NavBar from "./Navbar";
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
  PaginationLink,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "",
      url: "",
      lat: "",
      lon: "",
      trailid: "",
      list: 0,
      contents: "",
      url: ""
    };
    this.grabdata = this.grabdata.bind(this);
  }


  componentDidMount(){
    this.grabdata();
  }


  grabdata() {
    let url = window.location.href;
    let lastPart = url.split("/").pop();
    let fetchfrom = "http://hikingadventures.me/api/photos/" + lastPart;

    $.getJSON(fetchfrom)
      .then(results => {
        this.setState({
          name: results.name,
          url: results.url,
          lat: results.lat,
          lon: results.lon,
          trailid: results.trailid,
          contents: results.content,
          url: results.url
        });
      });
    let fetchresort = fetchfrom + "/resorts";
    $.getJSON(fetchresort).then(results => {
      let list = results.objects.map((resorts)=>{
        return (
          <li>
            <a className="btn btn-primary" href={"http://hikingadventures.me/resorts/" + resorts.id}>{resorts.name}</a>
          </li>
        )
      });
      this.setState({
        list:list
      });
    });
  }

  render () {
    let titles = {
      color:'white',
    };
    let center = {
      color: 'white',
      textAlign:'center'
    };
    let contentList1 = [];
    let contentList2 = [];
    let arr = this.state.contents.split(",");
    console.log(arr.length);
    for (let i = 0; i < 5; i++) {
      if(arr.length > i){
        contentList1.push(
            <ListGroupItem>
                {arr[i]}
            </ListGroupItem>
        );
      }
      if (arr.length > i+5){
        contentList2.push(
            <ListGroupItem>
                {arr[i+5]}
            </ListGroupItem>
        );
      }
    }
    return (
      <div>
      <NavBar/>
      <Container>
      <Row>
      <h1 id="name">{this.state.name}</h1><br/>
      </Row>
      <Row>
      <Col lg="6" sm="12">
      <Card className="mt-4">
      <img height={500} src={this.state.url} />
      </Card>
      </Col>
      <Col lg="6" sm="12">
      <Card className="mt-4">
      <iframe height={500} src={"https://www.google.com/maps/embed/v1/view?key=AIzaSyDRwflQaI1Zq5bqKVQJ2YBDHb7l7oD1L2o&center=" + this.state.lat + "," + this.state.lon + "&zoom=18&maptype=satellite"}/>
      </Card>
      </Col>
      </Row>
      <Row>
      <Col lg="6">
      <Card className="mt-4">
      <CardBody>
      <h2 style={titles}>Contents of photo:</h2>
      <ListGroup>
      <ul className="resort-scroll">
      {contentList1}
      {contentList2}
      </ul>
      </ListGroup>
      </CardBody>
      </Card>
      </Col>

      <Col lg="6">
      <Card className="mt-4">
      <CardBody>
      <h2 style={titles}>Location:</h2>
      <h4 style={titles}>Latitude:</h4>
      <h6 style={titles}>{this.state.lat}</h6>
      <h4 style={titles}>Longitude:</h4>
      <h6 style={titles}>{this.state.lat}</h6>
      </CardBody>
      <CardBody>
      <h2 style={titles}>Link to Picture:</h2>
      <a className="btn btn-primary" href={this.state.url}>{this.state.name}</a>
      </CardBody>
      </Card>
      </Col>
      </Row>
      <Row>
      <div className="col-lg-6">
      <Card className="mt-4">
      <CardBody>
      <h2 style={titles}>Link to Trail:</h2>
      <ul>
      <li>
      <a className="btn btn-primary" href={"http://hikingadventures.me/trails/" + this.state.trailid}>{this.state.name}</a>
      </li>
      </ul>
      </CardBody>
      </Card>
      </div>
      <div className="col-lg-6">
      <Card className="mt-4">
      <CardBody>
      <h2 style={titles}>Link to Resorts:</h2>
      <ul>
      {this.state.list}
      </ul>
      </CardBody>
      </Card>
      </div>
      </Row>
      </Container>
      </div>
    );
  }
}
