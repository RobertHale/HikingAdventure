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

export default class Trailcard extends React.Component {
  render () {
    var inputsize = true;
    if(this.props.data.length == 1){
      inputsize = false;
    }
    let mylinkone = "/trails/" + (this.props.data[0].id).toString();
    let mylinktwo = "/trails"
    let firstvideo = '';
    let secondvideo = '';
    let firstsummary = '';
    let secondsummary = '';
    let firstlength;
    let secondlength;
    let fdifficulty;
    let sdifficulty;

    if(this.props.data[0].youtubeid == null){
      firstvideo = "";
    }
    else{
      firstvideo = "http://www.youtube.com/embed/" + this.props.data[0].youtubeid;
    }
    if((this.props.data[0].summary).length == 0){
      firstsummary = "Unknown"
    }
    else{
      firstsummary = this.props.data[0].summary;
    }
    if((this.props.data[0].difficulty).length == 0){
      fdifficulty = "Unknown"
    }
    else{
      fdifficulty = this.props.data[0].difficulty;
    }
    if((this.props.data[1].length).length == 0){
      firstlength = "Unknown"
    }
    else{
      firstlength = this.props.data[1].length;
    }

    if((this.props.data).length > 1){
      mylinktwo = "/trails/" + (this.props.data[1].id).toString();
      if(this.props.data[1].youtubeid == null){
        secondvideo = "";
      }
      else{
        secondvideo = "http://www.youtube.com/embed/" + this.props.data[1].youtubeid;
      }
      if((this.props.data[1].summary).length == 0){
        secondsummary = "Unknown"
      }
      else{
        secondsummary = this.props.data[1].summary;
      }

      if((this.props.data[1].difficulty).length == 0){
        sdifficulty = "Unknown"
      }
      else{
        sdifficulty = this.props.data[1].difficulty;
      }

      if((this.props.data[1].length).length == 0){
        secondlength = "Unknown"
      }
      else{
        secondlength = this.props.data[1].length;
      }
    }


    return (
      <div>
      <Row>
      <Col lg="6" sm="12">
      <Card className="mt-4">
      <iframe src={firstvideo} width="100%" height="316" frameborder="0" allowFullScreen></iframe>
      <CardBody>
      <CardTitle><Link to={mylinkone}>{this.props.data[0].name}</Link></CardTitle>
      <CardText>
      <ul>
      <li>{"Summary: "}{firstsummary}</li>
      <li>{"Difficulty: "}{fdifficulty}</li>
      <li>{"Length: "}{firstlength}</li>
      </ul>
      </CardText>
      </CardBody>
      </Card>
      </Col>
      {inputsize == true &&
        <Col lg="6" sm="12">
        <Card className="mt-4">
        <iframe src={secondvideo} width="100%" height="316" frameborder="0" allowFullScreen></iframe>
        <CardBody>
        <CardTitle><Link to={mylinktwo}>{this.props.data[1].name}</Link></CardTitle>
        <CardText>
        <ul>
        <li>{"Summary: "}{secondsummary}</li>
        <li>{"Difficulty: "}{sdifficulty}</li>
        <li>{"Length: "}{secondlength}</li>
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
