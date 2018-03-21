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
    //console.log(fetchedResorts);
    var s = 2;
    var b = 0;
    var e = fetchedResorts.length;
    var mimic = fetchedResorts;
    var paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({presorts: paired});
  }
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    console.log("fire");
    console.log(nextProps.match.params.page);
    this.setState({perpage : nextProps.match.params.page});
    console.log(this.state.resorts);
    //Here we want to break down the information
  }

  getinfo(){
    $.getJSON('http://hikingadventures.me/api/resorts?page=1')
    .then(({ results }) => {console.log(results)});
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
      // var url = 'http://127.0.0.1:5000/api/resorts?page=';
      var pagenumber = this.props.match.params.page;
      console.log(pagenumber);
      var temp;
      if(pagenumber == null){
        pagenumber = 1
      }
      else{
        temp = pagenumber.split(" ");
        pagenumber = temp[1];
      }
    //  console.log(pagenumber);
      var fetchfrom = "http://127.0.0.1:5000/api/resorts?page=";
      fetchfrom += pagenumber;
      //console.log(fetchfrom);

      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects)});
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
        <Link to="/resortspage= 10">press me </Link>
        {rcard}
        <br/>
        <Row className="justify-content-center">
        <Pagination>
        <PaginationItem>
        <PaginationLink previous href="#" />
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/resorts">
        1
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/resortspage= 2">
        2
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/resortspage= 3">
        3
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/resortspage= 4">
        4
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/resortspage= 5">
        5
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/resortspage= 6">
        6
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink next href="#" />
        </PaginationItem>
        </Pagination>
        </Row>
        </div>
      );
    }
  }
