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
import TrailRow from "./TrailRow";
import $ from 'jquery';
import NavBar from "./Navbar";

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

  componentWillReceiveProps(nextProps){
    //console.log("fire");
    //console.log(nextProps.match.params.page);
    this.setState({perpage : nextProps.match.params.page});
    //console.log(this.state.resorts);
    //Here we want to break down the information
  }

  componentDidMount(){
      // var url = 'http://127.0.0.1:5000/api/resorts?page=';
      var pagenumber = this.props.match.params.page;
      //console.log(pagenumber);
      var temp;
      if(pagenumber == null){
        pagenumber = 1
      }
      else{
        temp = pagenumber.split(" ");
        pagenumber = temp[1];
      }
      //console.log(pagenumber);
      var fetchfrom = "http://127.0.0.1:5000/api/trails?page=";
      fetchfrom += pagenumber;
      //console.log(fetchfrom);

      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects)});
    }
    componentWillUnmount(){
      // <Link to="/resorts/10">press me </Link>
    }

    render () {
      let trow;
      if(this.state.presorts){
        trow = this.state.presorts.map(currentc => {
          return(
            <TrailRow key={currentc[0].id} data={currentc} />
          );
        })
      }
      let calculatepage = 1;
      let prev = "/trailspage= 1";
      let first = 1;
      let firstlink = "/trailspage= 1";
      let second = 2;
      let secondlink = "/trailspage= 2";
      let third = 3;
      let thirdlink = "/trailspage= 3";
      let fourth = 4;
      let fourthlink = "/trailspage= 4";
      let fifth = 5;
      let fifthlink = "/trailspage= 5";
      let next = "/trailspage= 6";
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
        prev = "/trailspage= " + (calculatepage - 3);
        firstlink = "/trailspage= " + (calculatepage - 2);
        secondlink = "/trailspage= " + (calculatepage - 1);
        thirdlink = "/trailspage= " + (calculatepage);
        fourthlink = "/trailspage= " + (calculatepage + 1);
        fifthlink = "/trailspage= " + (calculatepage + 2);
        next = "/trailspage= " + (calculatepage + 3);
      }
      return(

        <div>
        <NavBar/>
        <Container>
        {trow}
        <br/>
        <Row className="justify-content-center">
        <Pagination>
        <PaginationItem>
        <PaginationLink previous href={prev} />
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href={firstlink}>
        {first}
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href={secondlink}>
        {second}
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href={thirdlink}>
        {third}
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href={fourthlink}>
        {fourth}
        </PaginationLink>
        </PaginationItem>

        <PaginationItem>
        <PaginationLink href={fifthlink}>
        {fifth}
        </PaginationLink>
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
