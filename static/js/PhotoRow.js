// Card instance of Resort
import React from "react";
import PhotoCard from './PhotoCard';
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
    let pinstance;
    if(this.props.data){
      pinstance = this.props.data.map(single => {
        return(
          <PhotoCard key={single.id} photo={single} highlight={this.props.highlight} />
        );
      })
    }
    return (
      <div>
      <Row>
      {pinstance}
      </Row>
      </div>
    );
  }
}
