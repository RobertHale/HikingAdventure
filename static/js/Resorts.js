// Load all resorts in our database, 12 in each page
import React from "react";
import ReactDOM from "react-dom";
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
import ResortRow from "./ResortRow";
import NavBar from "./Navbar";
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

  }
  pairup(fetchedResorts){
    var s = 2;
    var b = 0;
    var e = fetchedResorts.length;
    var mimic = fetchedResorts;
    var paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      presorts: paired
    });
  }
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    window.scrollTo(0, 0)
    var pagenumber = nextProps.match.params.page;
    var temp;
    if(pagenumber == null){
      pagenumber = 1
    }
    else{
      temp = pagenumber.split(" ");
      pagenumber = temp[1];
      pagenumber = parseInt(pagenumber, 10);
    }
    var fetchfrom = "http://127.0.0.1:5000/api/resorts?page=";
    fetchfrom += pagenumber;
    $.getJSON(fetchfrom).then(results => {this.pairup(results.objects)});
  }

  componentDidMount(){
      // var url = 'http://127.0.0.1:5000/api/resorts?page=';
      var pagenumber = this.props.match.params.page;
      var temp;
      if(pagenumber == null){
        pagenumber = 1
      }
      else{
        temp = pagenumber.split(" ");
        pagenumber = temp[1];
        pagenumber = parseInt(pagenumber, 10);
      }
      var fetchfrom = "http://127.0.0.1:5000/api/resorts?page=";
      fetchfrom += pagenumber;

      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects)});
    }
    componentWillUnmount(){
      //Testing purposes
    }

    render () {
      let rrow;
      if(this.state.presorts){
        rrow = this.state.presorts.map(currentc => {
          return(
            <ResortRow key={currentc[0].id} data={currentc} />
          );
        })
      }
      let calculatepage = 1;
      let prev = "/resortspage= 1";
      let first = 1;
      let firstlink = "/resortspage= 1";
      let second = 2;
      let secondlink = "/resortspage= 2";
      let third = 3;
      let thirdlink = "/resortspage= 3";
      let fourth = 4;
      let fourthlink = "/resortspage= 4";
      let fifth = 5;
      let fifthlink = "/resortspage= 5";
      let next = "/resortspage= 6";
      let temp;
      if (this.props.match.params.page){
        temp = (this.props.match.params.page).split(" ");
        calculatepage = parseInt(temp[1], 10);
      }
      if (calculatepage > 3){
        first = calculatepage - 2;
        second = calculatepage - 1;
        third = calculatepage;
        fourth = calculatepage + 1;
        fifth = calculatepage + 2;
        prev = "/resortspage= " + (calculatepage - 3);
        firstlink = "/resortspage= " + (calculatepage - 2);
        secondlink = "/resortspage= " + (calculatepage - 1);
        thirdlink = "/resortspage= " + (calculatepage);
        fourthlink = "/resortspage= " + (calculatepage + 1);
        fifthlink = "/resortspage= " + (calculatepage + 2);
        next = "/resortspage= " + (calculatepage + 3);
      }
      return(

        <div>
        <NavBar/>
        <Container>
        {rrow}
        <br/>
        <Row className="justify-content-center">
        <Pagination>
        <PaginationItem>
        <PaginationLink previous href={prev} />
        </PaginationItem>

        <PaginationItem>
        <Link className="page-link" to={firstlink}>
        {first}
        </Link>
        </PaginationItem>

        <PaginationItem>
        <Link className="page-link" to={secondlink}>
        {second}
        </Link>
        </PaginationItem>

        <PaginationItem>
        <Link className="page-link" to={thirdlink}>
        {third}
        </Link>
        </PaginationItem>

        <PaginationItem>
        <Link className="page-link" to={fourthlink}>
        {fourth}
        </Link>
        </PaginationItem>

        <PaginationItem>
        <Link className="page-link" to={fifthlink}>
        {fifth}
        </Link>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink next href={next} />
        </PaginationItem>
        </Pagination>
        </Row>
        </Container>
        </div>
      );
    }
  }
