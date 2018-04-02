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
  PaginationLink,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
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
      dropdownOpen: false,
      sortBy: 0,
      lifts: "lifts",
      cLifts: 0,
      elev: "elev",
      celev: 0

    }
    this.toggle = this.toggle.bind(this);
    this.pairup = this.pairup.bind(this);
    this.sort = this.sort.bind(this);
    this.clickedLift = this.clickedLift.bind(this);
    this.clickedElev = this.clickedElev.bind(this);

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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
    console.log(this.state.cLifts);
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
      if (this.state.cLifts == 1) {
        url += "{\"field\":\"lifts\",\"direction\":\"asc\"}]}";
        url += "&page="
        url += pagenumber
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
      }
      if (this.state.celev == 1) {
        url += "{\"field\":\"elev\",\"direction\":\"asc\"}]}";
        url += "&page="
        url += pagenumber
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
      }
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

    sort(field){
        var pagenumber = this.props.match.params.page;
        if (field == "lifts") {
          var x = ("\"lifts\"")
        }
        if (field == "elev") {
          var x = ("\"elev\"")
        }
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
        url += "{\"field\":" + x + ",\"direction\":\"asc\"}]}";
        url += "&page="
        url += pagenumber
        console.log(url)
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }

    clickedLift(){
      this.setState({cLifts: 1});
      this.setState({celev: 0});
      this.sort(this.state.lifts)
    }

    clickedElev(){
      this.setState({celev: 1});
      this.setState({cLifts: 0});
      this.sort(this.state.elev)
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

        <Col lg="2" sm="10">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Sort by
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.toggle}>Name</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedLift}>Lifts</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedElev}>Elevation</DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </Col>



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
