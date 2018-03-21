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

export default class Photocard extends React.Component {
  render () {
    var inputsize = true;
    if(this.props.data.length == 1){
      inputsize = false;
    }
    let mylinkone = "/photos/" + (this.props.data[0].id).toString();
    let mylinktwo = "/photos/";
    let firstimage = '';
    let flongitude;
    let flatitude;
    let fid;
    let secondimage = '';
    let slongitude;
    let slatitude;
    let sid;

    if(this.props.data[0].url == null){
      firstimage = "";
    }
    else{
      firstimage = this.props.data[0].url;
    }
    if(this.props.data[0].lat == null){
      flatitude = "";
    }
    else{
      flatitude = this.props.data[0].lat;
    }
    if(this.props.data[0].lon == null){
      flongitude = "";
    }
    else{
      flongitude = this.props.data[0].lon;
    }
    if(this.props.data[0].trailid == null){
      fid = "";
    }
    else{
      fid = this.props.data[0].trailid;
    }


    if((this.props.data).length > 1){
      mylinktwo = "/photos/" + (this.props.data[1].id).toString();
      if(this.props.data[1].url == null){
        secondimage = "";
      }
      else{
        secondimage = this.props.data[1].url;
      }
      if(this.props.data[1].lat == null){
        slatitude = "";
      }
      else{
        slatitude = this.props.data[1].lat;
      }
      if(this.props.data[1].lon == null){
        slongitude = "";
      }
      else{
        slongitude = this.props.data[1].lon;
      }
      if(this.props.data[1].trailid == null){
        sid = "";
      }
      else{
        sid = this.props.data[1].trailid;
      }

    }

    return (
      <div>
      <Row>
      <Col lg="6" sm="12">
      <Card className="mt-4">
      <CardImg top width="100%" src={firstimage} alt="Missing" />
      <CardBody>
      <CardTitle><Link to={mylinkone}>{this.props.data[0].name}</Link></CardTitle>
      <CardText>
      <ul>
      <li>{"Latitude: "}{flatitude}</li>
      <li>{"Longitude: "}{flongitude}</li>
      <li>{"Trailid: "}{fid}</li>
      </ul>
      </CardText>
      </CardBody>
      </Card>
      </Col>
      {inputsize == true &&
        <Col lg="6" sm="12">
        <Card className="mt-4">
        <CardImg top width="100%" src={secondimage} alt="Missing" />
        <CardBody>
        <CardTitle><Link to={mylinktwo}>{this.props.data[1].name}</Link></CardTitle>
        <CardText>
        <ul>
        <li>{"Latitude: "}{slatitude}</li>
        <li>{"Longitude: "}{slongitude}</li>
        <li>{"Trail: "}{sid}</li>
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
