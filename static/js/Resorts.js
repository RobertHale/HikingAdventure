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
import Pages from "./Pages";
import $ from 'jquery';

export default class Resorts extends React.Component {
  constructor(){
    super();
    this.state = {
      resorts : [],
      presorts : [],
      pagecount: 0,
      cpage: 0,
      sortBy: 0
    }
    this.pairup = this.pairup.bind(this);
    this.sortLifts = this.sortLifts.bind(this);

  }
  pairup(fetchedResorts, resultcount, pagenumber){
    var s = 2;
    var b = 0;
    var e = fetchedResorts.length;
    var mimic = fetchedResorts;
    var paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    this.setState({
      presorts: paired,
      pagecount: Math.ceil(resultcount/10),
      cpage: pagenumber
    });
  }
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    window.scrollTo(0, 0)
    //console.log(this.state.sortBy);

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
    if (this.state.sortBy == 1) {
      var url = "http://127.0.0.1:5000/api/resorts?q=";
      url += "{\"order_by\":[";
      url += "{\"field\":\"lifts\",\"direction\":\"asc\"}]}";
      url += "&page="
      url += pagenumber
      $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }
    else{
      var fetchfrom = "http://127.0.0.1:5000/api/resorts?page=";
      fetchfrom += pagenumber;
      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }
  }

  componentDidMount(){
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
      // var url = 'http://127.0.0.1:5000/api/resorts?page=';
      var fetchfrom = "http://127.0.0.1:5000/api/resorts?page=";
      fetchfrom += pagenumber;
      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }
    componentWillUnmount(){
      //Testing purposes
    }

    sortLifts(){
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
        this.setState({sortBy: 1});
        //sort by lifts in ascending order(default)
        var url = "http://127.0.0.1:5000/api/resorts?q=";
        url += "{\"order_by\":[";
        url += "{\"field\":\"lifts\",\"direction\":\"asc\"}]}";
        url += "&page="
        url += pagenumber
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
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
      return(
        <div>
        <NavBar/>
        <Container>

        <Row>
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" >Sort by
          <span className="caret"></span></button>
          <ul className="dropdown-menu">
          <li><a onClick={this.sortLifts} href="#">Lifts</a></li>
          </ul>
        </div>
        </Row>

        {rrow}
        <br/>
        <Row className="justify-content-center">
        <Pages pagedata={{pagecount: this.state.pagecount, url: "/resortspage= ", cpage: this.state.cpage}}/>
        </Row>
        </Container>
        </div>
      );
    }
  }
