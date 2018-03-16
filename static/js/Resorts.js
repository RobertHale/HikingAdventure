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
import Resortcard from "./Resortcard";
import $ from 'jquery';

export default class Resorts extends React.Component {
  constructor(){
    super();
    this.state = {
      resorts : [],
      presorts : [],
      perpage : 0
    }
    this.pairup = this.pairup.bind(this);
    this.getinfo = this.getinfo.bind(this);
  }
  pairup(fetchedResorts){
    //Do magic
    console.log(fetchedResorts);
    var s = 2;
    var b = 0;
    var e = fetchedResorts.length;
    var mimic = fetchedResorts;
    var paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    console.log(paired);
    this.setState({presorts: paired});
  }
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    console.log("fire");
    this.setState({perpage : nextProps.match.params.page});
    this.getinfo();
    console.log(this.state.resorts);
    //Here we want to break down the information
  }

  getinfo(){
    $.getJSON('http://hikingadventures.me/api/resorts?page=1')
      .then(({ results }) => this.setState({ resorts: results }));
  }
  componentDidMount(){
    var x =
      [
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
        }];
      this.pairup(x);
    }
    componentWillUnmount(){
      // <Link to="/resorts/10">press me </Link>
      console.log("We unmounted Resorts");
    }

    render () {
      let rcard;
      if(this.state.presorts){
        rcard = this.state.presorts.map(currentc => {
          return(
            <Resortcard data = {currentc} />
          );
        })
      }
      return(

        <div>
        <Link to="/resorts/10">press me </Link>
        {rcard}
        </div>
      );
    }
  }
