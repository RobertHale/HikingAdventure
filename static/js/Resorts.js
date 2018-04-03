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
import Rpopup from "./Rpopup";
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
      cLifts: 0,
      celev: 0,
      cName: 0,
      cDesc: 0,
      cAsc: 0,
      cStars: 0,
      cRuns: 0,
      cReview: 0,
      showPopup: false
    }
    this.toggle = this.toggle.bind(this);
    this.pairup = this.pairup.bind(this);

    this.sort = this.sort.bind(this);
    this.clickedLift = this.clickedLift.bind(this);
    this.clickedElev = this.clickedElev.bind(this);
    this.clickedName = this.clickedName.bind(this);
    this.clickedStars = this.clickedStars.bind(this);
    this.clickedRuns = this.clickedRuns.bind(this);
    this.clickedReview = this.clickedReview.bind(this);
    this.clickedDesc= this.clickedDesc.bind(this);
    this.clickedAsc= this.clickedAsc.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
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
        if (this.state.cLifts == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/resorts?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"lifts\",\"direction\":\"desc\"}]}";
        }
      }
      if (this.state.celev == 1) {
        url += "{\"field\":\"elev\",\"direction\":\"asc\"}]}";
        if (this.state.celev == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/resorts?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"elev\",\"direction\":\"desc\"}]}";
        }
      }
      if (this.state.cName == 1) {
        url += "{\"field\":\"name\",\"direction\":\"asc\"}]}";
        if (this.state.cName == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/resorts?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"name\",\"direction\":\"desc\"}]}";
        }
      }

      if (this.state.cStars == 1) {
        url += "{\"field\":\"yelprating\",\"direction\":\"asc\"}]}";
        if (this.state.cStars == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/resorts?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"yelprating\",\"direction\":\"desc\"}]}";
        }
      }

      if (this.state.cRuns == 1) {
        url += "{\"field\":\"runs\",\"direction\":\"asc\"}]}";
        if (this.state.cRuns == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/resorts?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"runs\",\"direction\":\"desc\"}]}";
        }
      }

      if (this.state.cReview == 1) {
        url += "{\"field\":\"reviewcount\",\"direction\":\"asc\"}]}";
        if (this.state.cReview == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/resorts?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"reviewcount\",\"direction\":\"desc\"}]}";
        }
      }
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

    sort(field, dir){
        var pagenumber = this.props.match.params.page;
        var x = "";
        var d = dir;
        if (field == "lifts") {
          var x = ("\"lifts\"")
        }
        if (field == "elev") {
          var x = ("\"elev\"")
        }
        if (field == "name") {
          var x = ("\"name\"")
        }
        if (field == "yelprating") {
          var x = ("\"yelprating\"")
        }
        if (field == "runs") {
          var x = ("\"runs\"")
        }
        if (field == "reviewcount") {
          var x = ("\"reviewcount\"")
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
        var url = "http://127.0.0.1:5000/api/resorts?q=";
        url += "{\"order_by\":[";
        url += "{\"field\":" + x + ",\"direction\":" + d + "}]}";
        url += "&page="
        url += pagenumber
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }

    clickedLift(){
      this.setState({cLifts: 1});
      this.setState({celev: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cRuns: 0});
      this.setState({cReview: 0});
      this.sort("lifts", "\"asc\"")
    }

    clickedElev(){
      this.setState({celev: 1});
      this.setState({cLifts: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cRuns: 0});
      this.setState({cReview: 0});
      this.sort("elev", "\"asc\"")
    }

    clickedName(){
      this.setState({cLifts: 0});
      this.setState({celev: 0});
      this.setState({cName: 1});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cRuns: 0});
      this.setState({cReview: 0});
      this.sort("name", "\"asc\"")
    }

    clickedStars(){
      this.setState({cLifts: 0});
      this.setState({celev: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 1});
      this.setState({cRuns: 0});
      this.setState({cReview: 0});
      this.sort("yelprating", "\"asc\"")
    }

    clickedRuns(){
      this.setState({cLifts: 0});
      this.setState({celev: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cRuns: 1});
      this.setState({cReview: 0});
      this.sort("runs", "\"asc\"")
    }

    clickedReview(){
      this.setState({cLifts: 0});
      this.setState({celev: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cRuns: 0});
      this.setState({cReview: 1});
      this.sort("reviewcount", "\"asc\"")
    }

    clickedDesc(){
      this.setState({cDesc: 1});
      this.setState({cAsc: 0});
      if (this.state.cLifts == 1) {
        this.sort("lifts", "\"desc\"")
      }
      if (this.state.celev == 1) {
        this.sort("elev", "\"desc\"")
      }
      if (this.state.cName == 1) {
        this.sort("name", "\"desc\"")
      }
      if (this.state.cStars == 1) {
        this.sort("yelprating", "\"desc\"")
      }
      if (this.state.cRuns == 1) {
        this.sort("runs", "\"desc\"")
      }
      if (this.state.cReview == 1) {
        this.sort("reviewcount", "\"desc\"")
      }
    }

    clickedAsc(){
      this.setState({cAsc: 1});
      this.setState({cDesc: 0});
      if (this.state.cLifts == 1) {
        this.sort("lifts", "\"asc\"")
      }
      if (this.state.celev == 1) {
        this.sort("elev", "\"asc\"")
      }
      if (this.state.cName == 1) {
        this.sort("name", "\"asc\"")
      }
      if (this.state.cStars == 1) {
        this.sort("yelprating", "\"asc\"")
      }
      if (this.state.cRuns == 1) {
        this.sort("runs", "\"asc\"")
      }
      if (this.state.cReview == 1) {
        this.sort("reviewcount", "\"asc\"")
      }
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
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle color="primary" caret>
          Sort by
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.clickedName}>Name</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedLift}>Lifts</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedElev}>Elevation</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedStars}>Stars</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedRuns}>Runs</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedReview}>Review</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={this.state.btnDropup} toggle={() => { this.setState({ btnDropup: !this.state.btnDropup}); }}>
        <DropdownToggle color="primary" caret>
        Direction
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem onClick={this.clickedAsc}>Ascending</DropdownItem>
        <DropdownItem divider/>
        <DropdownItem onClick={this.clickedDesc}>Descending</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        <Button color="primary" onClick={this.togglePopup.bind(this)}>Filter</Button>
        </Row>
        {rrow}
        <br/>
        <Row className="justify-content-center">
        <Pages pagedata={{pagecount: this.state.pagecount, url: "/resortspage= ", cpage: this.state.cpage}}/>
        </Row>
        <Rpopup
            text='Close Me'
            isOpen={this.state.showPopup}
            toggle={this.togglePopup.bind(this)}
          />
        </Container>
        </div>
      );
    }
  }
