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
import ResortRow from "./ResortRow";
import TrailRow from "./TrailRow";
import PhotoRow from "./PhotoRow";
import NavBar from "./Navbar";
import Pages from "./Pages";
import $ from 'jquery';

export default class SearchResults extends React.Component {
	constructor(){
    super();
    this.state = {
      resorts    : [],
      trails     : [],
      photos     : [],
      Rpresorts  : [],
      Tpresorts  : [],
      Ppresorts  : [],
      Rpagecount : 0,
      Tpagecount : 0,
      Ppagecount : 0,
      Rpage      : 0,
      Tpage      : 0,
      Ppage      : 0,
      query      : ""
    }
    this.Rpairup = this.Rpairup.bind(this);
    this.Tpairup = this.Tpairup.bind(this);
    this.Ppairup = this.Ppairup.bind(this);
  }

  Rpairup(fetchedItems, resultcount, pagenumber){
    //Do magic
    //console.log(fetchedItems);
    var s = 2;
    var b = 0;
    var e = fetchedItems.length;
    var mimic = fetchedItems;
    var paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      Rpresorts: paired,
      Rpagecount: Math.ceil(resultcount/10),
      Rpage: pagenumber
    });
  }

  Tpairup(fetchedItems, resultcount, pagenumber){
    //Do magic
    //console.log(fetchedItems);
    var s = 2;
    var b = 0;
    var e = fetchedItems.length;
    var mimic = fetchedItems;
    var paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      Tpresorts: paired,
      Tpagecount: Math.ceil(resultcount/10),
      Tpage: pagenumber
    });
  }

  Ppairup(fetchedItems, resultcount, pagenumber){
    //Do magic
    //console.log(fetchedItems);
    var s = 2;
    var b = 0;
    var e = fetchedItems.length;
    var mimic = fetchedItems;
    var paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      Ppresorts: paired,
      Ppagecount: Math.ceil(resultcount/10),
      Ppage: pagenumber
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
    console.log(this.state.query);
  	var Rfetch = "http://127.0.0.1:5000/api/resorts?page=" + pagenumber + "&results_per_page=3&q=";
  	Rfetch += this.state.query;
  	console.log(Rfetch);
  	var Tfetch = "http://127.0.0.1:5000/api/trails?page=" + pagenumber + "&results_per_page=3&q=";
  	Tfetch += this.state.query;
  	console.log(Tfetch);
  	var Pfetch = "http://127.0.0.1:5000/api/photos?page=" + pagenumber + "&results_per_page=3&q=";
  	Pfetch += this.state.query;
  	console.log(Pfetch);
  	$.getJSON(Rfetch).then(results => {this.Rpairup(results.objects, results.num_results, pagenumber)});
  	$.getJSON(Tfetch).then(results => {this.Tpairup(results.objects, results.num_results, pagenumber)});
  	$.getJSON(Pfetch).then(results => {this.Ppairup(results.objects, results.num_results, pagenumber)});
  }

  componentDidMount(){
  	// var query = this.props.match.params.query;
    var query = "{\"filters\":[{\"name\":\"name\",\"op\":\"like\",\"val\":\"" 
      + "%25" + this.props.match.params.query + "%25" + "\"}]}";
    this.setState({
      query : query
    });
  	console.log(query);
  	var Rfetch = "http://127.0.0.1:5000/api/resorts?page=1&results_per_page=3&q=";
  	Rfetch += query;
  	console.log(Rfetch);
  	var Tfetch = "http://127.0.0.1:5000/api/trails?page=1&results_per_page=3&q=";
  	Tfetch += query;
  	console.log(Tfetch);
  	var Pfetch = "http://127.0.0.1:5000/api/photos?page=1&results_per_page=3&q=";
  	Pfetch += query;
  	console.log(Pfetch);
  	$.getJSON(Rfetch).then(results => {this.Rpairup(results.objects, results.num_results, 1)});
  	$.getJSON(Tfetch).then(results => {this.Tpairup(results.objects, results.num_results, 1)});
  	$.getJSON(Pfetch).then(results => {this.Ppairup(results.objects, results.num_results, 1)});
  }

  componentWillUnmount(){
  }

	render () {
      let rrow;
      if(this.state.Rpresorts){
        rrow = this.state.Rpresorts.map(currentc => {
          return(
            <ResortRow key={currentc[0].id} data={currentc} />
          );
        })
      }
      let trow;
      if(this.state.Tpresorts){
        trow = this.state.Tpresorts.map(currentc => {
          return(
            <TrailRow key={currentc[0].id} data={currentc} />
          );
        })
      }
      let prow;
      if(this.state.Ppresorts){
        prow = this.state.Ppresorts.map(currentc => {
          return(
            <PhotoRow key={currentc[0].id} data = {currentc} />
          );
        })
      }
      return(
      	<div>
        <NavBar/>
        <Container>
        <h1>Resorts:</h1>
        {rrow}
        <h1>Trails:</h1>
        {trow}
        <h1>photos:</h1>
        {prow}
        <br/>
        <Row className="justify-content-center">
        <Pages pagedata={{pagecount: this.state.Rpagecount, url: "/searchresultspage= ", cpage: this.state.Rpage}}/>
        </Row>
        </Container>
        </div>
      )
    }
}