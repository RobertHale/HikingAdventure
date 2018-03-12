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
    var inputsize = true;
    if(this.props.data.length == 1){
      inputsize = false;
    }
    return (
      <div>
      <Row>
      <Col lg="6" sm="12">
      <Card>
      <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
      <CardBody>
      <CardTitle>{this.props.data[0].name}</CardTitle>
      <CardText>{this.props.data[0].lifts}</CardText>
      </CardBody>
      </Card>
      </Col>
      {inputsize == true &&
        <Col lg="6" sm="12">
        <Card>
        <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
        <CardBody>
        <CardTitle>{this.props.data[1].name}</CardTitle>
        <CardText>{this.props.data[1].lifts} </CardText>
        </CardBody>
        </Card>
        </Col>
      }
      </Row>
      </div>
    );
  }
}

// <div>
// <Row>
//   <Col lg="6" sm="12">
//     <Card>
//       <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
//       <CardBody>
//         <CardTitle>Adolfo</CardTitle>
//         <CardText> </CardText>
//       </CardBody>
//     </Card>
//   </Col>
//   <Col lg="6" sm="12">
//     <Card>
//       <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
//       <CardBody>
//         <CardTitle>Adolfo</CardTitle>
//         <CardText> </CardText>
//       </CardBody>
//     </Card>
//   </Col>
// </Row>
// <Row>
// <Col lg="6" sm="12">
//   <Card>
//     <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
//     <CardBody>
//       <CardTitle>Adolfo</CardTitle>
//       <CardText> </CardText>
//     </CardBody>
//   </Card>
// </Col>
// <Col lg="6" sm="12">
//   <Card>
//     <CardImg top width="100%" src="https://i.imgur.com/M8hkf2Z.png" alt="Missing" />
//     <CardBody>
//       <CardTitle>Adolfo</CardTitle>
//       <CardText> </CardText>
//     </CardBody>
//   </Card>
// </Col>
// </Row>
// </div>
