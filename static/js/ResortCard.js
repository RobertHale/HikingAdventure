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

export default class ResortCard extends React.Component {
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
      <CardTitle><Link to={mylink}><Highlighter
          highlightClassName="Highlight"
          searchWords={[this.props.highlight]}
          autoEscape={true}
          textToHighlight={name}
      /></Link></CardTitle>
      <ul>
      <li className="proplifts">{"Number of Lifts: "}{lifts}</li>
      <li className="propelev">{"Elevation: "}{elevation}</li>
      <li className="proplat">{"Latitude: "}{latitude}</li>
      <li className="proplon">{"Longitude: "}{longitude}</li>
      </ul>
      </CardBody>
      </Card>
      </Col>
    );
  }
}
