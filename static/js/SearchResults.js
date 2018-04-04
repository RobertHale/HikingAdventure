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
import Srp from "./SearchResultPages";
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
      Rpage      : 1,
      Tpage      : 1,
      Ppage      : 1,
      query      : ""
    }
    this.Rpairup = this.Rpairup.bind(this);
    this.Tpairup = this.Tpairup.bind(this);
    this.Ppairup = this.Ppairup.bind(this);
    this.Rchangepage = this.Rchangepage.bind(this);
    this.Tchangepage = this.Tchangepage.bind(this);
    this.Pchangepage = this.Pchangepage.bind(this);
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
      Rpagecount: Math.ceil(resultcount/4),
      Rpage: pagenumber
    });
  }
  Rchangepage(page){
    var Rfetch = "http://127.0.0.1:5000/api/resorts?page=" + page + "&results_per_page=4&q=";
    Rfetch += this.state.query;
    //console.log(Rfetch);
    $.getJSON(Rfetch).then(results => {this.Rpairup(results.objects, results.num_results, page)});
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
      Tpagecount: Math.ceil(resultcount/4),
      Tpage: pagenumber
    });
  }
  Tchangepage(page){
    var Tfetch = "http://127.0.0.1:5000/api/trails?page=" + page + "&results_per_page=4&q=";
    Tfetch += this.state.query;
    //console.log(Tfetch);
    $.getJSON(Tfetch).then(results => {this.Tpairup(results.objects, results.num_results, page)});
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
      Ppagecount: Math.ceil(resultcount/4),
      Ppage: pagenumber
    });
  }
  Pchangepage(page){
    var Pfetch = "http://127.0.0.1:5000/api/photos?page=" + page + "&results_per_page=4&q=";
    Pfetch += this.state.query;
    //console.log(Pfetch);
    $.getJSON(Pfetch).then(results => {this.Ppairup(results.objects, results.num_results, page)});
  }

  componentWillReceiveProps(nextProps){

  	window.scrollTo(0, 0)
    var query = "{\"filters\":[{\"name\":\"name\",\"op\":\"like\",\"val\":\""
      + "%25" + nextProps.match.params.query + "%25" + "\"}]}";

    this.setState({
      query : query
    });
    //console.log(this.state.query);
  	var Rfetch = "http://127.0.0.1:5000/api/resorts?page=" + this.state.Rpage + "&results_per_page=4&q=";
  	Rfetch += query
  	//console.log(Rfetch);
  	var Tfetch = "http://127.0.0.1:5000/api/trails?page=" + this.state.Tpage  + "&results_per_page=4&q=";
  	Tfetch += query
  	//console.log(Tfetch);
  	var Pfetch = "http://127.0.0.1:5000/api/photos?page=" + this.state.Ppage + "&results_per_page=4&q=";
  	Pfetch += query
  	//console.log(Pfetch);
  	$.getJSON(Rfetch).then(results => {this.Rpairup(results.objects, results.num_results, this.state.Rpage)});
  	$.getJSON(Tfetch).then(results => {this.Tpairup(results.objects, results.num_results, this.state.Tpage)});
  	$.getJSON(Pfetch).then(results => {this.Ppairup(results.objects, results.num_results, this.state.Ppage)});
  }

  componentDidMount(){
  	// var query = this.props.match.params.query;
    var query = "{\"filters\":[{\"name\":\"name\",\"op\":\"like\",\"val\":\""
      + "%25" + this.props.match.params.query + "%25" + "\"}]}";
    this.setState({
      query : query
    });
  	//console.log(query);
  	var Rfetch = "http://127.0.0.1:5000/api/resorts?page=1&results_per_page=4&q=";
  	Rfetch += query;
  	//console.log(Rfetch);
  	var Tfetch = "http://127.0.0.1:5000/api/trails?page=1&results_per_page=4&q=";
  	Tfetch += query;
  	//console.log(Tfetch);
  	var Pfetch = "http://127.0.0.1:5000/api/photos?page=1&results_per_page=4&q=";
  	Pfetch += query;
  	//console.log(Pfetch);
  	$.getJSON(Rfetch).then(results => {this.Rpairup(results.objects, results.num_results, 1)});
  	$.getJSON(Tfetch).then(results => {this.Tpairup(results.objects, results.num_results, 1)});
  	$.getJSON(Pfetch).then(results => {this.Ppairup(results.objects, results.num_results, 1)});
  }

  componentWillUnmount(){
  }

	render () {
      //console.log('R page is ' + this.state.Rpage);
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
        <br/>
        <h3>Resorts:</h3>
        {rrow}
        <br/>
        <Row className="justify-content-center">
        <Srp cPage ={this.state.Rpage} pageCount={this.state.Rpagecount} changePage={this.Rchangepage}/>
        </Row>
        <h3>Trails:</h3>
        {trow}
        <br/>
        <Row className="justify-content-center">
        <Srp cPage ={this.state.Tpage} pageCount={this.state.Tpagecount} changePage={this.Tchangepage}/>
        </Row>
        <h3>photos:</h3>
        {prow}
        <br/>
        <Row className="justify-content-center">
        <Srp cPage ={this.state.Ppage} pageCount={this.state.Ppagecount} changePage={this.Pchangepage}/>
        </Row>
        </Container>
        </div>
      )
    }
}
