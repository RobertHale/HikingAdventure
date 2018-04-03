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
import PhotoRow from "./PhotoRow";
import NavBar from "./Navbar";
import Pages from "./Pages";
import $ from 'jquery';

export default class Photos extends React.Component {
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
      sortEnum: {NONE:0, LON:1, LAT:2, NAME:3},
      sortList: ["", "\"lon\"", "\"lat\"", "\"name\""],
      dirEnum: {ASC:0, DESC:1},
      dirList: ["\"asc\"", "\"desc\""],
    }
    this.pairup = this.pairup.bind(this);
    this.toggle = this.toggle.bind(this);

    this.sort = this.sort.bind(this);
    this.clickedLongitude = this.clickedLongitude.bind(this);
    this.clickedLatitude = this.clickedLatitude.bind(this);
    this.clickedName = this.clickedName.bind(this);
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
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    window.scrollTo(0, 0)
    var pagenumber = nextProps.match.params.page;
    var sortb = this.state.sortBy;
    var temp;
    if(pagenumber == null){
      pagenumber = 1
    }
    else{
      temp = pagenumber.split(" ");
      pagenumber = temp[1];
      pagenumber = parseInt(pagenumber, 10);
    }
    var url = "http://127.0.0.1:5000/api/photos?q={";
    url += "\"order_by\":[";
    if (this.state.sortBy !=  0) {
      url += "{\"field\":" + this.state.sortList[sortb] + ",\"direction\":" + this.state.dirList[this.state.direction] + "}";
    }
    url += "]}";
    url += "&page=";
    url += pagenumber;
    $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});


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
      //console.log(pagenumber);
      var fetchfrom = "http://127.0.0.1:5000/api/photos?page=";
      fetchfrom += pagenumber;
      //console.log(fetchfrom);

      $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
    }
    componentWillUnmount(){
      // <Link to="/resorts/10">press me </Link>
      //console.log("We unmounted Resorts");
    }


    sort(field, dir){
        field = this.state.sortList[field];
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
        var url = "http://127.0.0.1:5000/api/photos?q=";
        url += "{\"order_by\":[";
        if (this.state.sortBy != this.state.sortEnum.NONE) {
          url += "{\"field\":" + field + ",\"direction\":" + dir + "}]}";
        }
        url += "&page="
        url += pagenumber
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});

    }

    clickedLongitude(){
      this.setState({sortBy: this.state.sortEnum.LON}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }

    clickedLatitude(){
      this.setState({sortBy: this.state.sortEnum.LAT}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }

    clickedName(){
      this.setState({sortBy: this.state.sortEnum.NAME}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }



    clickedDesc(){
      this.setState({direction: this.state.dirEnum.DESC});
      this.sort(this.state.sortBy, this.state.dirList[1]);
    }

    clickedAsc(){
      this.setState({direction: this.state.dirEnum.ASC});
      this.sort(this.state.sortBy, this.state.dirList[0]);
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
          <DropdownItem onClick={this.clickedLongitude}>Longitude</DropdownItem>
          <DropdownItem divider/>
          <DropdownItem onClick={this.clickedLatitude}>Latitude</DropdownItem>
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

        {prow}
        <br/>
        <Row className="justify-content-center">
        <Pages pagedata={{pagecount: this.state.pagecount, url: "/photospage= ", cpage: this.state.cpage}}/>
        </Row>
        </Container>
        </div>
      );
    }
  }
