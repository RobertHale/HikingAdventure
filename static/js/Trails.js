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
import Trailcard from "./Trailcard";
import $ from 'jquery';

export default class Trails extends React.Component {
  constructor(){
    super();
    this.state = {
      resorts : [],
      presorts : [],
      perpage : 0
    }
    this.pairup = this.pairup.bind(this);
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

  componentWillReceiveProps(nextProps){
    console.log("fire");
    console.log(nextProps.match.params.page);
    this.setState({perpage : nextProps.match.params.page});
    console.log(this.state.resorts);
    //Here we want to break down the information
  }

  componentDidMount(){
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
      console.log(pagenumber);
      var fetchfrom = "http://127.0.0.1:5000/api/trails?page=";
      fetchfrom += pagenumber;
      console.log(fetchfrom);

      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects)});
    }
    componentWillUnmount(){
      // <Link to="/resorts/10">press me </Link>
    }

    render () {
      let tcard;
      if(this.state.presorts){
        tcard = this.state.presorts.map(currentc => {
          return(
            <Trailcard data = {currentc} />
          );
        })
      }
      return(

        <div>
        {tcard}
        <br/>
        <Row className="justify-content-center">
        <Pagination>
        <PaginationItem>
        <PaginationLink previous href="#" />
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/trailspage= 1">
        1
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/trailspage= 2">
        2
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/trailspage= 3">
        3
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/trailspage= 4">
        4
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href="/trailspage= 5">
        5
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
