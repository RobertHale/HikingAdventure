// Load all resorts in our database, 12 in each page
import React from "react";
import {
  Button,
  Row,
  Container,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Alert
} from 'reactstrap';
import PhotoRow from "./PhotoRow";
import Ppopup from "./Ppopup";
import NavBar from "./Navbar";
import Pages from "./Pages";
import Spinner from "./Spinner";
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
      sortList: ["", "lon", "lat", "name"],
      showAttribute: ["", "Longitude", "Latitude", "Name"],
      dirEnum: {ASC:0, DESC:1},
      dirList: ["asc", "desc"],
      showPopup: false,
      showSorting: 0,
      showDirection: 0,
      filter: "",
      filtMap: [],
      loading: true
    };
    this.pairup = this.pairup.bind(this);
    this.toggle = this.toggle.bind(this);
    this.sort = this.sort.bind(this);
    this.submitFilter = this.submitFilter.bind(this);
    this.clickedLongitude = this.clickedLongitude.bind(this);
    this.clickedLatitude = this.clickedLatitude.bind(this);
    this.clickedReset = this.clickedReset.bind(this);
    this.clickedName = this.clickedName.bind(this);
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

  submitFilter(filter, filtMap){
    this.setState({
      filter: filter,
      filtMap: filtMap,
      cpage: 1
    }, () => {
      this.sort(this.state.sortBy, this.state.direction);
    });
  }

  pairup(fetchedResorts, resultcount, pagenumber){
    //Do magic
    //console.log(fetchedResorts);
    let s = 2;
    let b = 0;
    let e = fetchedResorts.length;
    let mimic = fetchedResorts;
    let paired = [];
    for(b, e; b < e; b += s){
      paired.push(mimic.slice(b, b+s));
    }
    //console.log(paired);
    this.setState({
      presorts: paired,
      pagecount: Math.ceil(resultcount/10),
      cpage: pagenumber,
      loading: false
    });
  }
  //This is where we want to query the database
  //For now we use temporary information
  componentWillReceiveProps(nextProps){
    this.setState({loading: true});
    window.scrollTo(0, 0);
    let pagenumber = nextProps.match.params.page;
    let temp;
    if(pagenumber == null){
      pagenumber = 1
    }
    else{
      temp = pagenumber.split(" ");
      pagenumber = temp[1];
      pagenumber = parseInt(pagenumber, 10);
    }
    let url = "http://hikingadventures.me/api/photos?q={";
    url += "\"order_by\":[";
    if (this.state.sortBy !==  0) {
      url += "{\"field\":\"" + this.state.sortList[this.state.sortBy] + "\"";
      url += ",\"direction\":\"" + this.state.dirList[this.state.direction] + "\"}";
    }
    url += "]";
    if(!(this.state.filter === "")) url += "," + this.state.filter;
    url += "}";
    url += "&page=";
    url += pagenumber;
    $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
  }

  componentDidMount(){
    this.setState({loading: true});
    // var url = 'http://hikingadventures.me/api/resorts?page=';
      let pagenumber = this.props.match.params.page;
      let temp;
      if(pagenumber == null){
      pagenumber = 1
    }
    else{
      temp = pagenumber.split(" ");
      pagenumber = temp[1];
      pagenumber = parseInt(pagenumber, 10);
    }
    //console.log(pagenumber);
    let fetchfrom = "http://hikingadventures.me/api/photos?page=";
    fetchfrom += pagenumber;
    //console.log(fetchfrom);
    $.getJSON(fetchfrom).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
  }
  componentWillUnmount(){
      // <Link to="/resorts/10">press me </Link>
      //console.log("We unmounted Resorts");
  }

  sort(field, dir){
    this.setState({loading: true});
    let pagenumber = this.props.match.params.page;
    let temp;
    if(pagenumber == null){
      pagenumber = 1
    }
    else{
      temp = pagenumber.split(" ");
      pagenumber = temp[1];
      pagenumber = parseInt(pagenumber, 10);
    }
    let url = "http://hikingadventures.me/api/photos?q=";
    url += "{\"order_by\":[";
    if (field !== this.state.sortEnum.NONE) {
      url += "{\"field\":\"" + this.state.sortList[field] + "\"";
      url += ",\"direction\":\"" + this.state.dirList[dir] + "\"}";
    }

    url += "]";
    if(!(this.state.filter === "")) url += "," + this.state.filter;
    url += "}";
    url += "&page=";
    url += pagenumber;
    $.getJSON(url).then(results => {this.pairup(results.objects, results.num_results, pagenumber)});
  }

  clickedLongitude(){
    this.setState({sortBy: this.state.sortEnum.LON, showSorting: this.state.sortEnum.LON}, () =>
    this.sort(this.state.sortEnum.LON, this.state.direction));
  }

  clickedLatitude(){
    this.setState({sortBy: this.state.sortEnum.LAT, showSorting: this.state.sortEnum.LAT}, () =>
    this.sort(this.state.sortEnum.LAT, this.state.direction));
  }

  clickedName(){
    this.setState({sortBy: this.state.sortEnum.NAME, showSorting: this.state.sortEnum.NAME}, () =>
    this.sort(this.state.sortEnum.NAME, this.state.direction));
  }

  clickedReset(){
    this.setState({sortBy: this.state.sortEnum.NONE, showSorting: this.state.sortEnum.NONE, direction: this.state.sortEnum.ASC, showDirection: this.state.sortEnum.ASC, filter:"", filtMap:[]}, () =>
    this.sort(this.state.sortEnum.NONE, this.state.direction));
  }

  clickedDesc(){
    this.setState({direction: this.state.dirEnum.DESC, showDirection: this.state.dirEnum.DESC}, () =>
    this.sort(this.state.sortBy, this.state.dirEnum.DESC));
  }

  clickedAsc(){
    this.setState({direction: this.state.dirEnum.ASC, showDirection: this.state.dirEnum.ASC}, () =>
    this.sort(this.state.sortBy, this.state.dirEnum.ASC));
  }

  render () {
    let prow;
    let filters;
    let isloading = this.state.loading;
    if(this.state.presorts){
      prow = this.state.presorts.map(currentc => {
        return(
          <PhotoRow key={currentc[0].id} data = {currentc} />
        );
      })
    }
    if(this.state.filtMap.length !== 0){
      filters = this.state.filtMap.map(cFilter => {
        return(
            <Alert color={"sec"}>
                {cFilter}
            </Alert>
        )
      })
    }
    return(
      <div>
      <NavBar/>
      <Container>
      <Row>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle color="prim" caret>
        Sort by: {this.state.showAttribute[this.state.showSorting]}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={this.clickedName}>Name</DropdownItem>
        <DropdownItem divider/>
        <DropdownItem onClick={this.clickedLongitude}>Longitude</DropdownItem>
        <DropdownItem divider/>
        <DropdownItem onClick={this.clickedLatitude}>Latitude</DropdownItem>
      </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={this.state.btnDropup} toggle={() => { this.setState({ btnDropup: !this.state.btnDropup}); }}>
      <DropdownToggle color="prim" caret>
      Direction: {this.state.dirList[this.state.showDirection]}
      </DropdownToggle>
      <DropdownMenu>
      <DropdownItem onClick={this.clickedAsc}>Ascending</DropdownItem>
      <DropdownItem divider/>
      <DropdownItem onClick={this.clickedDesc}>Descending</DropdownItem>
      </DropdownMenu>
      </Dropdown>
      <Button color="prim" onClick={this.togglePopup.bind(this)}>Filter</Button>
      <Button color="prim" onClick={this.clickedReset}>Reset</Button>
      {this.state.filtMap.length !== 0 ? <Alert color={"prim"}>{"Filters: "}{filters}</Alert> : ""}
      </Row>
      {isloading ? <Spinner/> : prow}
      <br/>
      <Row className="justify-content-center">
      <Pages pagedata={{pagecount: this.state.pagecount, url: "/photospage= ", cpage: this.state.cpage}}/>
      </Row>
      <Ppopup
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
