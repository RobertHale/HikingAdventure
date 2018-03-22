// Card instance of Resort
import React from "react";
import TrailInstance from './TrailInstance';
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
          <TrailInstance key={single.id} trail={single} />
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
