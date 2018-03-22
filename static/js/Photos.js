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
import PhotoRow from "./PhotoRow";
import $ from 'jquery';

export default class Photos extends React.Component {
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
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    //console.log("fire");
    console.log(nextProps.match.params.page);
    this.setState({perpage : nextProps.match.params.page});
    console.log(this.state.resorts);
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
      var fetchfrom = "http://127.0.0.1:5000/api/photos?page=";
      fetchfrom += pagenumber;
      //console.log(fetchfrom);

      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects)});
    }
    componentWillUnmount(){
      // <Link to="/resorts/10">press me </Link>
      //console.log("We unmounted Resorts");
    }

    render () {
      let prow;
      if(this.state.presorts){
        prow = this.state.presorts.map(currentc => {
          return(
            <PhotoRow key={currentc[0].id} data = {currentc} />
          );
        })
      }
      let calculatepage = 1;
      let prev = "/photospage= 1";
      let first = 1;
      let firstlink = "/photospage= 1";
      let second = 2;
      let secondlink = "/photospage= 2";
      let third = 3;
      let thirdlink = "/photospage= 3";
      let fourth = 4;
      let fourthlink = "/photospage= 4";
      let fifth = 5;
      let fifthlink = "/photospage= 5";
      let next = "/photospage= 6";
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
        prev = "/photospage= " + (calculatepage - 3);
        firstlink = "/photospage= " + (calculatepage - 2);
        secondlink = "/photospage= " + (calculatepage - 1);
        thirdlink = "/photospage= " + (calculatepage);
        fourthlink = "/photospage= " + (calculatepage + 1);
        fifthlink = "/photospage= " + (calculatepage + 2);
        next = "/photospage= " + (calculatepage + 3);
      }
      return(
        <div>
        {prow}
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
        </div>
      );
    }
  }
