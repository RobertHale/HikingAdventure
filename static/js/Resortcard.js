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

export default class card extends React.Component {
  render () {
    var inputsize = true;
    if(this.props.data.length == 1){
      inputsize = false;
    }
    const mylinkone = "/resorts/" + (this.props.data[0].id).toString();
    const mylinktwo = "/resorts/" + (this.props.data[1].id).toString();
    console.log(mylinkone)
    let firstimage = '';
    let secondimage = '';

    if((this.props.data[0].photos).length == 0){
      firstimage = "";
    }
    else{
      firstimage = this.props.data[0].photos[0].url;
    }
    if((this.props.data[1].photos).length == 0){
      secondimage = "";
    }
    else{
      secondimage = this.props.data[1].photos[0].url;
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
      <li>{"Number of Lifts: "}{this.props.data[0].lifts}</li>
      <li>{"Elevation: "}{this.props.data[0].elev}</li>
      <li>{"Latitude: "}{this.props.data[0].lat}</li>
      <li>{"Longitude: "}{this.props.data[0].lon}</li>
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
        <li>{"Number of Lifts: "}{this.props.data[1].lifts}</li>
        <li>{"Elevation: "}{this.props.data[1].elev}</li>
        <li>{"Latitude: "}{this.props.data[1].lat}</li>
        <li>{"Longitude: "}{this.props.data[1].lon}</li>
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
