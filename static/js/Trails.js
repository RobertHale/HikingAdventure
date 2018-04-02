// Load all resorts in our database, 12 in each page
import React from "react";
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
      cpage: 0
    }
    this.pairup = this.pairup.bind(this);

  }
<<<<<<< HEAD

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
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
    var fetchfrom = "http://127.0.0.1:5000/api/trails?page=";
    fetchfrom += pagenumber;
    $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
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
          />
        </Container>
        </div>
      );
    }
  }
