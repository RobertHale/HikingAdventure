import React from "react";
import {
  Row,
  Container} from 'reactstrap';
import ResortRow from "./ResortRow";
import TrailRow from "./TrailRow";
import PhotoRow from "./PhotoRow";
import NavBar from "./Navbar";
import Srp from "./SearchResultPages";
import Spinner from "./Spinner";
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
      Rpagecount : 1,
      Tpagecount : 1,
      Ppagecount : 1,
      Rpage      : 1,
      Tpage      : 1,
      Ppage      : 1,
      query      : "",
      Rloading: true,
      Tloading: true,
      Ploading: true
    };
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
    const s = 2;
    let b = 0;
    const e = fetchedItems.length;
    const mimic = fetchedItems;
    const paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      Rpresorts: paired,
      Rpagecount: Math.ceil(resultcount/4),
      Rpage: pagenumber,
      Rloading: false
    });
  }
  Rchangepage(page){
    this.setState({Rloading: true});
    let Rfetch = "http://hikingadventures.me/api/resorts?page=" + page + "&results_per_page=4&q=";
    Rfetch += this.state.query;
    //console.log(Rfetch);
    $.getJSON(Rfetch).then(results => {this.Rpairup(results.objects, results.num_results, page)});
  }

  Tpairup(fetchedItems, resultcount, pagenumber){
    //Do magic
    //console.log(fetchedItems);
    const s = 2;
    let b = 0;
    const e = fetchedItems.length;
    const mimic = fetchedItems;
    const paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      Tpresorts: paired,
      Tpagecount: Math.ceil(resultcount/4),
      Tpage: pagenumber,
      Tloading: false
    });
  }
  Tchangepage(page){
    this.setState({Tloading: true});
    let Tfetch = "http://hikingadventures.me/api/trails?page=" + page + "&results_per_page=4&q=";
    Tfetch += this.state.query;
    //console.log(Tfetch);
    $.getJSON(Tfetch).then(results => {this.Tpairup(results.objects, results.num_results, page)});
  }

  Ppairup(fetchedItems, resultcount, pagenumber){
    //Do magic
    //console.log(fetchedItems);
    const s = 2;
    let b = 0;
    const e = fetchedItems.length;
    const mimic = fetchedItems;
    const paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      Ppresorts: paired,
      Ppagecount: Math.ceil(resultcount/4),
      Ppage: pagenumber,
      Ploading: false
    });
  }
  Pchangepage(page){
    this.setState({Ploading: true});
    let Pfetch = "http://hikingadventures.me/api/photos?page=" + page + "&results_per_page=4&q=";
    Pfetch += this.state.query;
    //console.log(Pfetch);
    $.getJSON(Pfetch).then(results => {this.Ppairup(results.objects, results.num_results, page)});
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      Rloading: true,
      Tloading: true,
      Ploading: true
    });

  	window.scrollTo(0, 0);
    const query = "{\"filters\":[{\"name\":\"name\",\"op\":\"like\",\"val\":\""
      + "%25" + nextProps.match.params.query + "%25" + "\"}]}";

    this.setState({
      query : query
    });
    //console.log(this.state.query);
    let Rfetch = "http://hikingadventures.me/api/resorts?page=" + this.state.Rpage + "&results_per_page=4&q=";
    Rfetch += query;
  	//console.log(Rfetch);
    let Tfetch = "http://hikingadventures.me/api/trails?page=" + this.state.Tpage + "&results_per_page=4&q=";
    Tfetch += query;
  	//console.log(Tfetch);
    let Pfetch = "http://hikingadventures.me/api/photos?page=" + this.state.Ppage + "&results_per_page=4&q=";
    Pfetch += query;
  	//console.log(Pfetch);
  	$.getJSON(Rfetch).then(results => {this.Rpairup(results.objects, results.num_results, this.state.Rpage)});
  	$.getJSON(Tfetch).then(results => {this.Tpairup(results.objects, results.num_results, this.state.Tpage)});
  	$.getJSON(Pfetch).then(results => {this.Ppairup(results.objects, results.num_results, this.state.Ppage)});
  }

  componentDidMount(){
  	// var query = this.props.match.params.query;
    const query = "{\"filters\":[{\"name\":\"name\",\"op\":\"like\",\"val\":\""
      + "%25" + this.props.match.params.query + "%25" + "\"}]}";
    this.setState({
      query : query
    });
    // http://hikingadventures.me
  	//console.log(query);
    let Rfetch = "http://hikingadventures.me/api/resorts?page=1&results_per_page=4&q=";
    Rfetch += query;
  	//console.log(Rfetch);
    let Tfetch = "http://hikingadventures.me/api/trails?page=1&results_per_page=4&q=";
    Tfetch += query;
  	//console.log(Tfetch);
    let Pfetch = "http://hikingadventures.me/api/photos?page=1&results_per_page=4&q=";
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
      let Rloading = this.state.Rloading;
      let Tloading = this.state.Tloading;
      let Ploading = this.state.Ploading;
      let Rresults = this.state.Rpagecount;
      let Tresults = this.state.Tpagecount;
      let Presults = this.state.Ppagecount;
      let rrow;
      if(this.state.Rpresorts){
        rrow = this.state.Rpresorts.map(currentc => {
          return(
            <ResortRow key={currentc[0].id} data={currentc} highlight={this.props.match.params.query}/>
          );
        })
      }
      let trow;
      if(this.state.Tpresorts){
        trow = this.state.Tpresorts.map(currentc => {
          return(
            <TrailRow key={currentc[0].id} data={currentc} highlight={this.props.match.params.query} />
          );
        })
      }
      let prow;
      if(this.state.Ppresorts){
        prow = this.state.Ppresorts.map(currentc => {
          return(
            <PhotoRow key={currentc[0].id} data = {currentc} highlight={this.props.match.params.query} />
          );
        })
      }
      return(
      	<div>
        <NavBar/>
        <Container>
        <br/>
        <h3>Resorts:</h3>
        {Rresults === 0 ? <p>{"No Resorts Found"}</p> : null}
        {Rloading ? <Spinner/> : rrow}
        <br/>
        <Row className="justify-content-center">
        <Srp cPage ={this.state.Rpage} pageCount={this.state.Rpagecount} changePage={this.Rchangepage}/>
        </Row>
        <h3>Trails:</h3>
        {Tresults === 0 ? <p>{"No Trails Found"}</p> : null}
        {Tloading ? <Spinner/> : trow}
        <br/>
        <Row className="justify-content-center">
        <Srp cPage ={this.state.Tpage} pageCount={this.state.Tpagecount} changePage={this.Tchangepage}/>
        </Row>
        <h3>Photos:</h3>
        {Presults === 0 ? <p>{"No Photos Found"}</p> : null}
        {Ploading ? <Spinner/> : prow}
        <br/>
        <Row className="justify-content-center">
        <Srp cPage ={this.state.Ppage} pageCount={this.state.Ppagecount} changePage={this.Pchangepage}/>
        </Row>
        </Container>
        </div>
      )
    }
}
