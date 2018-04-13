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
import Highlighter from "react-highlight-words";

export default class PhotoCard extends React.Component {
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
      <CardTitle><Link to={mylink}><Highlighter
          highlightClassName="Highlight"
          searchWords={[this.props.highlight]}
          autoEscape={true}
          textToHighlight={name}/>
      </Link>
      </CardTitle>
      <ul>
      <li>{"Latitude: "}{latitude}</li>
      <li>{"Longitude: "}{longitude}</li>
      <li>{"Nearby Trail Id: "}{id}</li>
      </ul>
      </CardBody>
      </Card>
      </Col>
    );
  }
}
