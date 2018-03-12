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
import { Link } from "react-router-dom";

export default class Resorts extends React.Component {
  constructor(){
    super();
    this.state = {
      resorts : [],
      perpage : 0

    }

  }
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    console.log("fire");
    this.setState({perpage : nextProps.match.params.page});
  }

  componentDidMount(){
    console.log("mounted");
  }
  componentWillUnmount(){
    console.log("wtf");
  }

  render () {
    return(
      <div>
      <p>
      Data here {this.state.perpage} {this.props.match.params.page}
      </p>
      <Link to="/resorts/10">press me </Link>
      </div>
    );
  }
}
