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

export default class card extends React.Component {
  render () {
    var inputsize = true;
    if(this.props.data.length == 1){
      inputsize = false;
    }
    let mylinkone = "/resorts/" + (this.props.data[0].id).toString();
    let mylinktwo = "/resorts"
    let fvideo = "";
    let svideo = "";
    let flifts = "Unknown";
    let slifts = "Unknown";
    let felevation = "Unknown";
    let selevation = "Unknown";
    let flatitude = "Unknown";
    let slatitude = "Unknown";
    let flongitude = "Unknown";
    let slongitude = "Unknown";

    if(this.props.data[0].youtubeid != null){
      fvideo = "http://www.youtube.com/embed/" + this.props.data[0].youtubeid;
    }
    if(this.props.data[0].lifts != null){
      flifts = this.props.data[0].lifts;
    }
    if(this.props.data[0].elev != null){
      felevation = this.props.data[0].elev;
    }
    if(this.props.data[0].lat != null){
      flatitude = this.props.data[0].lat;
    }
    if(this.props.data[0].lon != null){
      flongitude = this.props.data[0].lon;
    }

    if((this.props.data).length > 1){
      mylinktwo = "/resorts/" + (this.props.data[1].id).toString();
      if(this.props.data[1].youtubeid != null){
        svideo = "http://www.youtube.com/embed/" + this.props.data[1].youtubeid;
      }
      if(this.props.data[1].lifts != null){
        slifts = this.props.data[1].lifts;
      }
      if(this.props.data[1].elev != null){
        selevation = this.props.data[1].elev;
      }
      if(this.props.data[1].lat != null){
        slatitude = this.props.data[1].lat;
      }
      if(this.props.data[1].lon != null){
        slongitude = this.props.data[1].lon;
      }
    }


    return (
      <div>
      <Row>
      <Col lg="6" sm="12">
      <Card className="mt-4">
      <iframe src={fvideo} width="100%" height="316" frameborder="0" allowFullScreen></iframe>
      <CardBody>
      <CardTitle><Link to={mylinkone}>{this.props.data[0].name}</Link></CardTitle>
      <CardText>
      <ul>
      <li>{"Number of Lifts: "}{flifts}</li>
      <li>{"Elevation: "}{felevation}</li>
      <li>{"Latitude: "}{flatitude}</li>
      <li>{"Longitude: "}{flongitude}</li>
      </ul>
      </CardText>
      </CardBody>
      </Card>
      </Col>
      {inputsize == true &&
        <Col lg="6" sm="12">
        <Card className="mt-4">
        <iframe src={svideo} width="100%" height="316" frameborder="0" allowFullScreen></iframe>
        <CardBody>
        <CardTitle><Link to={mylinktwo}>{this.props.data[1].name}</Link></CardTitle>
        <CardText>
        <ul>
        <li>{"Number of Lifts: "}{slifts}</li>
        <li>{"Elevation: "}{selevation}</li>
        <li>{"Latitude: "}{slatitude}</li>
        <li>{"Longitude: "}{slongitude}</li>
        </ul>
        </CardText>
        </CardBody>
        </Card>
        </Col>
      }
      </Row>
      </div>
    );
  }
}
