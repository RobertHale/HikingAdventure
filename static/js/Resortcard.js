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

export default class card extends React.Component {
  render () {
    return (
      <div>
      <Row>
        <Col lg="6" sm="12">
          <Card>
            <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
            <CardBody>
              <CardTitle>Adolfo</CardTitle>
              <CardText> </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" sm="12">
          <Card>
            <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
            <CardBody>
              <CardTitle>Adolfo</CardTitle>
              <CardText> </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
      <Col lg="6" sm="12">
        <Card>
          <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
          <CardBody>
            <CardTitle>Adolfo</CardTitle>
            <CardText> </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col lg="6" sm="12">
        <Card>
          <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
          <CardBody>
            <CardTitle>Adolfo</CardTitle>
            <CardText> </CardText>
          </CardBody>
        </Card>
      </Col>
      </Row>
      </div>
    );
  }
}
