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
    const mylinkone = "/photos/" + (this.props.data[0].id).toString();
    const mylinktwo = "/photos/" + (this.props.data[1].id).toString();
    let firstimage = '';
    let secondimage = '';

    if(this.props.data[0].url == null){
      firstimage = "";
    }
    else{
      firstimage = this.props.data[0].url;
    }
    if(this.props.data[1].url == null){
      secondimage = "";
    }
    else{
      secondimage = this.props.data[1].url;
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
