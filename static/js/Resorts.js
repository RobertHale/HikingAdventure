// Load all resorts in our database, 12 in each page
import React from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

export default class Resorts extends React.Component {
  constructor(){
    super();
    this.set = {resorts : []}
  }
  //This is where we want to query the database
  //For now we use temporary information
  componentWillMount(){
    this.setState({
      resorts: [
        {
          name  : "a",
          lifts : 1,
          runs  : 1
        },
        {
          name  : "b",
          lifts : 2,
          runs  : 2
        },
        {
          name  : "c",
          lifts : 3,
          runs  : 3
        },
        {
          name  : "d",
          lifts : 4,
          runs  : 4
        },
        {
          name  : "e",
          lifts : 5,
          runs  : 5
        },
        {
          name  : "f",
          lifts : 6,
          runs  : 6
        },
        {
          name  : "g",
          lifts : 7,
          runs  : 7
        },
        {
          name  : "h",
          lifts : 8,
          runs  : 8
        },
        {
          name  : "i",
          lifts : 9,
          runs  : 9
        },
      ]});
  }

  render () {
    <div>
    <Row>
      <Col>
        <div id="card3" class="card h-100 mt-4 cardbg"></div>
      </div>
      <div class="col-sm-12 col-lg-6 col-centered">
        <div id="card4" class="card h-100 mt-4 cardbg"></div>
      </Col>
    </Row>

    </div>
  }
}
