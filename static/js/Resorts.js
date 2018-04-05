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
      direction: 0,
      sortEnum: {NONE:0, LIFTS:1, ELEV:2, NAME:3, STARS:4, RUNS:5, REVIEW:6},
      sortList: ["", "lifts", "elev", "name", "yelprating", "runs", "reviewcount"],
      dirEnum: {ASC:0, DESC:1},
      dirList: ["asc", "desc"],
      showPopup: false,
      showSorting: 0,
      showDirection: 0,
      filter: ""
    }
    this.toggle = this.toggle.bind(this);
    this.pairup = this.pairup.bind(this);

    this.submitFilter = this.submitFilter.bind(this);

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

  submitFilter(filter){
    this.setState({
      filter: filter
    }, () => {
      this.sort(this.state.sortBy, this.state.direction);
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
    var id = ("\"id\"");
    var dir = ("\"" + this.state.dirList[this.state.showDirection] + "\"");
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
    var url = "http://127.0.0.1:5000/api/resorts?q={";
    url += "\"order_by\":[";
    if (this.state.sortBy != this.state.sortEnum.NONE) {
      url += "{\"field\":\"" + this.state.sortList[this.state.sortBy] + "\"";
      url += ",\"direction\":\"" + this.state.dirList[this.state.direction] + "\"}";
    }
    url += "]"
    if(!(this.state.filter === "")) url += "," + this.state.filter;
    url += "}";
    url += "&page=";
    url += pagenumber;
    $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
  }

  componentDidMount(){
      var pagenumber = this.props.match.params.page;
      var id = ("\"id\"");
      var dir = ("\"" + this.state.dirList[this.state.showDirection] + "\"");
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


      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }
    componentWillUnmount(){
      //Testing purposes
    }

    sort(sort, dir){
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
        var url = "http://127.0.0.1:5000/api/resorts?q=";
        url += "{\"order_by\":[";
        if (sort != this.state.sortEnum.NONE) {
          url += "{\"field\":\"" + this.state.sortList[sort] + "\"";
          url += ",\"direction\":\"" + this.state.dirList[dir] + "\"}";
        }
        url += "]";
        if(!(this.state.filter === "")) url += "," + this.state.filter;
        url += "}";
        url += "&page="
        url += pagenumber
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }

    clickedLift(){
      this.setState({sortBy: this.state.sortEnum.LIFTS});
      this.setState({showSorting: this.state.sortEnum.LIFTS});
      this.sort(this.state.sortEnum.LIFTS, this.state.direction);
    }

    clickedElev(){
      this.setState({sortBy: this.state.sortEnum.ELEV});
      this.setState({showSorting: this.state.sortEnum.ELEV});
      this.sort(this.state.sortEnum.ELEV, this.state.direction);
    }

    clickedName(){
      this.setState({sortBy: this.state.sortEnum.NAME});
      this.setState({showSorting: this.state.sortEnum.NAME});
      this.sort(this.state.sortEnum.NAME, this.state.direction);
    }

    clickedStars(){
      this.setState({sortBy: this.state.sortEnum.STARS});
      this.setState({showSorting: this.state.sortEnum.STARS});
      this.sort(this.state.sortEnum.STARS, this.state.direction);
    }

    clickedRuns(){
      this.setState({sortBy: this.state.sortEnum.RUNS});
      this.setState({showSorting: this.state.sortEnum.RUNS});
      this.sort(this.state.sortEnum.RUNS, this.state.direction);
    }

    clickedReview(){
      this.setState({sortBy: this.state.sortEnum.REVIEW});
      this.setState({showSorting: this.state.sortEnum.REVIEW});
      this.sort(this.state.sortEnum.REVIEW, this.state.direction);
    }

    clickedDesc(){
      this.setState({direction: this.state.dirEnum.DESC});
      this.setState({showDirection: this.state.dirEnum.DESC});
      this.sort(this.state.sortBy, this.state.dirEnum.DESC);
    }

    clickedAsc(){
      this.setState({direction: this.state.dirEnum.ASC});
      this.setState({showDirection: this.state.dirEnum.ASC});
      this.sort(this.state.sortBy, this.state.dirEnum.ASC);
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
          Sort by: {this.state.sortList[this.state.showSorting]}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.clickedName}>Name</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedLift}>Lifts</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedElev}>Elevation</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedStars}>Yelp Rating</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedRuns}>Runs</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedReview}>Review Count</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        <Dropdown isOpen={this.state.btnDropup} toggle={() => { this.setState({ btnDropup: !this.state.btnDropup}); }}>
        <DropdownToggle color="primary" caret>
        Direction: {this.state.dirList[this.state.showDirection]}
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
            submit={this.submitFilter}
          />
        </Container>
        </div>
      );
    }
  }
