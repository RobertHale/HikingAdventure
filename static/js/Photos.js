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
import PhotoRow from "./PhotoRow";
import Ppopup from "./Ppopup";
import NavBar from "./Navbar";
import Pages from "./Pages";
import $ from 'jquery';

export default class Photos extends React.Component {
  constructor(){
    super();
    this.state = {
      resorts : [],
      presorts : [],
      perpage : 0,
      showPopup: false
    }
    this.pairup = this.pairup.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
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
    var temp;
    if(pagenumber == null){
      pagenumber = 1
    }
    else{
      temp = pagenumber.split(" ");
      pagenumber = temp[1];
      pagenumber = parseInt(pagenumber, 10);
    }
    var fetchfrom = "http://127.0.0.1:5000/api/photos?page=";
    fetchfrom += pagenumber;
    $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
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
        <Button color="primary" onClick={this.togglePopup.bind(this)}>Filter</Button>
        </Row>
        {prow}
        <br/>
        <Row className="justify-content-center">
        <Pages pagedata={{pagecount: this.state.pagecount, url: "/photospage= ", cpage: this.state.cpage}}/>
        </Row>
        <Ppopup
            text='Close Me'
            isOpen={this.state.showPopup}
            toggle={this.togglePopup.bind(this)}
          />
        </Container>
        </div>
      );
    }
  }
