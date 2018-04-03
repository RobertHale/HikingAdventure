// Load all resorts in our database, 12 in each page
import React from "react";
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
import TrailRow from "./TrailRow";
import $ from 'jquery';
import NavBar from "./Navbar";
import Pages from "./Pages";

export default class Trails extends React.Component {
  constructor(){
    super();
    this.state = {
      resorts : [],
      presorts : [],
      pagecount: 0,
      cpage: 0,

      dropdownOpen: false,
      sortBy: 0,
      cAscent: 0, //trails (works)
      cDescent: 0, //trails (works)
      cName: 0,  //trails (works)
      cDesc: 0,  //trails descending button
      cAsc: 0,   //trails ascending button
      cStars: 0,  //trails(works)
      cDiff: 0,   //trails(works)
      cLength: 0,  //trails (works)
    }
    this.pairup = this.pairup.bind(this);

    this.toggle = this.toggle.bind(this);
    this.sort = this.sort.bind(this);
    this.clickedAscent = this.clickedAscent.bind(this);
    this.clickedDescent = this.clickedDescent.bind(this);
    this.clickedName = this.clickedName.bind(this);
    this.clickedStars = this.clickedStars.bind(this);
    this.clickedDiff = this.clickedDiff.bind(this);
    this.clickedLength = this.clickedLength.bind(this);
    this.clickedDesc= this.clickedDesc.bind(this);
    this.clickedAsc= this.clickedAsc.bind(this);

  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  pairup(fetchedResorts, resultcount, pagenumber){
    //Do magic
    //console.log(fetchedResorts);
    console.log(pagenumber);
    console.log(resultcount);
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
      presorts: paired,
      pagecount: Math.ceil(resultcount/10),
      cpage: pagenumber
    });
  }

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
      var url = "http://127.0.0.1:5000/api/trails?q=";
      url += "{\"order_by\":[";
      if (this.state.cAscent == 1) {
        url += "{\"field\":\"ascent\",\"direction\":\"asc\"}]}";
        if (this.state.cAscent == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/trails?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"ascent\",\"direction\":\"desc\"}]}";
        }
      }
      if (this.state.cDescent == 1) {
        url += "{\"field\":\"descent\",\"direction\":\"asc\"}]}";
        if (this.state.cDescent == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/trails?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"descent\",\"direction\":\"desc\"}]}";
        }
      }
      if (this.state.cName == 1) {
        url += "{\"field\":\"name\",\"direction\":\"asc\"}]}";
        if (this.state.cName == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/trails?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"name\",\"direction\":\"desc\"}]}";
        }
      }

      if (this.state.cStars == 1) {
        url += "{\"field\":\"stars\",\"direction\":\"asc\"}]}";
        if (this.state.cStars == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/trails?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"stars\",\"direction\":\"desc\"}]}";
        }
      }

      if (this.state.cDiff == 1) {
        url += "{\"field\":\"difficulty\",\"direction\":\"asc\"}]}";
        if (this.state.cDiff == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/trails?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"difficulty\",\"direction\":\"desc\"}]}";
        }
      }

      if (this.state.cLength == 1) {
        url += "{\"field\":\"length\",\"direction\":\"asc\"}]}";
        if (this.state.cLength == 1 && this.state.cDesc == 1) {
          var url = "http://127.0.0.1:5000/api/trails?q=";
          url += "{\"order_by\":[";
          url += "{\"field\":\"length\",\"direction\":\"desc\"}]}";
        }
      }
      url += "&page="
      url += pagenumber
      $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }
    else{
      var fetchfrom = "http://127.0.0.1:5000/api/trails?page=";
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
      var fetchfrom = "http://127.0.0.1:5000/api/trails?page=";
      fetchfrom += pagenumber;
      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }

    componentWillUnmount(){
      // Testing purposes
    }

    sort(field, dir){
        var pagenumber = this.props.match.params.page;
        var x = "";
        var d = dir;
        if (field == "ascent") {
          var x = ("\"ascent\"")
        }
        if (field == "descent") {
          var x = ("\"descent\"")
        }
        if (field == "name") {
          var x = ("\"name\"")
        }
        if (field == "stars") {
          var x = ("\"stars\"")
        }
        if (field == "difficulty") {
          var x = ("\"difficulty\"")
        }
        if (field == "length") {
          var x = ("\"length\"")
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
        var url = "http://127.0.0.1:5000/api/trails?q=";
        url += "{\"order_by\":[";
        url += "{\"field\":" + x + ",\"direction\":" + d + "}]}";
        url += "&page="
        url += pagenumber
        console.log(url)
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }

    clickedAscent(){
      this.setState({cAscent: 1});
      this.setState({cDescent: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cDiff: 0});
      this.setState({cLength: 0});
      this.sort("ascent", "\"asc\"")
    }

    clickedDescent(){
      this.setState({cDescent: 1});
      this.setState({cAscent: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cDiff: 0});
      this.setState({cLength: 0});
      this.sort("descent", "\"asc\"")
    }

    clickedName(){
      this.setState({cAscent: 0});
      this.setState({cDescent: 0});
      this.setState({cName: 1});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cDiff: 0});
      this.setState({cLength: 0});
      this.sort("name", "\"asc\"")
    }

    clickedStars(){
      this.setState({cAscent: 0});
      this.setState({cDescent: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 1});
      this.setState({cDiff: 0});
      this.setState({cLength: 0});
      this.sort("stars", "\"asc\"")
    }

    clickedDiff(){
      this.setState({cAscent: 0});
      this.setState({cDescent: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cDiff: 1});
      this.setState({cLength: 0});
      this.sort("difficulty", "\"asc\"")
    }

    clickedLength(){
      this.setState({cAscent: 0});
      this.setState({cDescent: 0});
      this.setState({cName: 0});
      this.setState({cDesc: 0});
      this.setState({cAsc: 0});
      this.setState({cStars: 0});
      this.setState({cDiff: 0});
      this.setState({cLength: 1});
      this.sort("length", "\"asc\"")
    }

    clickedDesc(){
      this.setState({cDesc: 1});
      this.setState({cAsc: 0});
      if (this.state.cAscent == 1) {
        this.sort("ascent", "\"desc\"")
      }
      if (this.state.cDescent == 1) {
        this.sort("descent", "\"desc\"")
      }
      if (this.state.cName == 1) {
        this.sort("name", "\"desc\"")
      }
      if (this.state.cStars == 1) {
        this.sort("stars", "\"desc\"")
      }
      if (this.state.cDiff == 1) {
        this.sort("difficulty", "\"desc\"")
      }
      if (this.state.cLength == 1) {
        this.sort("length", "\"desc\"")
      }
    }

    clickedAsc(){
      this.setState({cAsc: 1});
      this.setState({cDesc: 0});
      if (this.state.cAscent == 1) {
        this.sort("ascent", "\"asc\"")
      }
      if (this.state.cDescent == 1) {
        this.sort("descent", "\"asc\"")
      }
      if (this.state.cName == 1) {
        this.sort("name", "\"asc\"")
      }
      if (this.state.cStars == 1) {
        this.sort("stars", "\"asc\"")
      }
      if (this.state.cDiff == 1) {
        this.sort("difficulty", "\"asc\"")
      }
      if (this.state.cLength == 1) {
        this.sort("length", "\"asc\"")
      }
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
          <DropdownItem onClick={this.clickedName}>Name</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedAscent}>Ascent</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedDescent}>Descent</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedStars}>Stars</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedDiff}>Difficulty</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedLength}>Length</DropdownItem>
        </DropdownMenu>
      </Dropdown>
        </Col>
        <Col lg="2" sm="10">
        <Dropdown direction="up" isOpen={this.state.btnDropup} toggle={() => { this.setState({ btnDropup: !this.state.btnDropup}); }}>
        <DropdownToggle caret>
        Direction
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem onClick={this.clickedAsc}>Ascending</DropdownItem>
        <DropdownItem divider/>
        <DropdownItem onClick={this.clickedDesc}>Descending</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        </Col>
        </Row>

        {trow}
        <br/>
        <Row className="justify-content-center">
        <Pages pagedata={{pagecount: this.state.pagecount, url: "/trailspage= ", cpage: this.state.cpage}}/>
        </Row>
        </Container>
        </div>
      );
    }
  }
