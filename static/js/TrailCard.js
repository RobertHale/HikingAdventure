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

export default class TrailCard extends React.Component {
  render () {
    let name = "Unknown";
    let mylink = "Unknown";
    let video = "";
    let summary = "No Summary";
    let length = "Unknown";
    let difficulty = "Unknown";

    if(this.props.trail){
      name = this.props.trail.name;
      mylink = "/trails/" + (this.props.trail.id).toString();
      if(this.props.trail.youtubeid != null){
        video = "http://www.youtube.com/embed/" + this.props.trail.youtubeid;
      }
      if((this.props.trail.summary).length != 0){
        summary = this.props.trail.summary;
      }
      if((this.props.trail.difficulty).length != 0){
        difficulty = this.props.trail.difficulty;
      }
      if((this.props.trail.length).length != 0){
        length = this.props.trail.length;
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
      <li>{"Summary: "}{summary}</li>
      <li>{"Difficulty: "}{difficulty}</li>
      <li>{"Length: "}{length}</li>
      </ul>
      </CardText>
      </CardBody>
      </Card>
      </Col>
    );
  }
}
