// Card instance of Resort
import React from "react";
import TrailCard from './TrailCard';
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

export default class TrailRow extends React.Component {
  render () {
    let tinstance;
    if(this.props.data){
      tinstance = this.props.data.map(single => {
        return(
          <TrailCard key={single.id} trail={single} highlight={this.props.highlight} />
        );
      })
    }
    return (
      <div>
      <Row>
      {tinstance};
      </Row>
      </div>
    );
  }
}
