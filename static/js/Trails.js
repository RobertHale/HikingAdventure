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
import Tpopup from "./Tpopup";
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
      direction: 0,
      sortEnum: {NONE:0, ASCENT:1, DESCENT:2, NAME:3, STARS:4, DIFFICULTY:5, LENGTH:6},
      sortList: ["", "\"ascent\"", "\"descent\"", "\"name\"", "\"stars\"", "\"difficulty\"", "\"length\""],
      dirEnum: {ASC:0, DESC:1},
      dirList: ["\"asc\"", "\"desc\""],
      showPopup: false,
      filter: ""
    }
    this.pairup = this.pairup.bind(this);

    this.toggle = this.toggle.bind(this);
    this.sort = this.sort.bind(this);
    this.submitFilter = this.submitFilter.bind(this);
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

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
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

  componentWillReceiveProps(nextProps){
    window.scrollTo(0, 0)
    var pagenumber = nextProps.match.params.page;
    var temp;
    var sortb = this.state.sortBy;
    if(pagenumber == null){
      pagenumber = 1
    }
    else{
      temp = pagenumber.split(" ");
      pagenumber = temp[1];
      pagenumber = parseInt(pagenumber, 10);
    }
    var url = "http://127.0.0.1:5000/api/trails?q={";
    url += "\"order_by\":[";
    if (this.state.sortBy !=  0) {
      url += "{\"field\":" + this.state.sortList[sortb] + ",\"direction\":" + this.state.dirList[this.state.direction] + "}";
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
        field = this.state.sortList[field];
        var temp;
        var pagenumber = this.props.match.params.page;
        if(pagenumber == null){
          pagenumber = 1
        }
        else{
          temp = pagenumber.split(" ");
          pagenumber = temp[1];
          pagenumber = parseInt(pagenumber, 10);
        }
        var url = "http://127.0.0.1:5000/api/trails?q=";
        url += "{\"order_by\":[";
        if (this.state.sortBy != this.state.sortEnum.NONE) {
          url += "{\"field\":" + field + ",\"direction\":" + dir + "}";
        }
        url += "]";
        if(!(this.state.filter === "")) url += "," + this.state.filter;
        url += "}";
        url += "&page="
        url += pagenumber
        console.log(url);
        $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});

    }

    clickedAscent(){
      this.setState({sortBy: this.state.sortEnum.ASCENT}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }

    clickedDescent(){
      this.setState({sortBy: this.state.sortEnum.DESCENT}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }

    clickedName(){
      this.setState({sortBy: this.state.sortEnum.NAME}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }

    clickedStars(){
      this.setState({sortBy: this.state.sortEnum.STARS}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }

    clickedDiff(){
      this.setState({sortBy: this.state.sortEnum.DIFFICULTY}, () =>
      this.sort(this.state.sortBy, "\"asc\""));
    }

    clickedLength(){
      this.setState({sortBy: this.state.sortEnum.LENGTH}, () =>
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
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle color="primary" caret>
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

        {trow}
        <br/>
        <Row className="justify-content-center">
        <Pages pagedata={{pagecount: this.state.pagecount, url: "/trailspage= ", cpage: this.state.cpage}}/>
        </Row>
        <Tpopup
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
