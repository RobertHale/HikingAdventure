import React from "react";
import { InputGroup, InputGroupAddon, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Rpopup extends React.Component {
  constructor(){
    super();
    this.state = {
      lifts: "",
      runs: "",
      elev: "",
      stars: "",
      lat: "",
      lon: ""
    };
    this.handleLiftChange = this.handleLiftChange.bind(this);
    this.handleRunChange  = this.handleRunChange.bind(this);
    this.handleElevChange = this.handleElevChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handleLatChange  = this.handleLatChange.bind(this);
    this.handleLonChange  = this.handleLonChange.bind(this);
    this.submitFilter     = this.submitFilter.bind(this);
  }
  handleLiftChange(e) {
    this.setState({lifts: e.target.value});
  }
  handleRunChange(e) {
    this.setState({runs: e.target.value});
  }
  handleElevChange(e) {
    this.setState({elev: e.target.value});
  }
  handleStarChange(e) {
    this.setState({stars: e.target.value}); 
  }
  handleLatChange(e) {
    this.setState({lat: e.target.value});
  }
  handleLonChange(e) {
    this.setState({lon: e.target.value});
  }
  static checkAndNotifyNumber(number, name, min, max){
    if (number === ""){
      return false;
    }
    if (isNaN(number)){
      alert("Please provide a number for " + name);
      return false;
    }
    if (number < min){
      alert("Please provide a number greater than " + min + " for " + name);
      return false;
    }
    if (number > max){
      alert("Please provide a number less than " + max + " for " + name);
      return false;
    }
    return true;
  }
  submitFilter(){
    let filter = "\"filters\":[";
    let filtMap = [];
    let notFirst = false;
    if (Rpopup.checkAndNotifyNumber(this.state.lifts, "lifts", 0, 40)) {
      if(!notFirst){
        notFirst = true;
      }
      filter += "{\"name\":\"lifts\",\"op\":\">=\",\"val\":" + this.state.lifts + "}";
      filtMap.push("Lifts >= " + this.state.lifts);
    }
    if (Rpopup.checkAndNotifyNumber(this.state.runs, "runs", 0, 200)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"runs\",\"op\":\">=\",\"val\":" + this.state.runs + "}";
      filtMap.push("Runs >= " + this.state.runs);
    }
    if (Rpopup.checkAndNotifyNumber(this.state.elev, "elevation", 0, 5000)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"elev\",\"op\":\">=\",\"val\":" + this.state.elev + "}";
      filtMap.push("Elevation >= " + this.state.elev);
    }
    if (Rpopup.checkAndNotifyNumber(this.state.stars, "rating", 0, 5)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"yelprating\",\"op\":\">=\",\"val\":" + this.state.stars + "}";
      filtMap.push("Rating >= " + this.state.stars + " stars");
    }
    // noinspection JSBitwiseOperatorUsage
    if (Rpopup.checkAndNotifyNumber(this.state.lat, "latitude", 0, 180) & Rpopup.checkAndNotifyNumber(this.state.lon, "longitude", -180, 0)) {
      if(notFirst){
        filter +=",";
      }
      filter += "{\"name\":\"lat\",\"op\":\"like\",\"val\":" + this.state.lat + "}";
      filter += ",";
      filter += "{\"name\":\"lon\",\"op\":\"like\",\"val\":" + this.state.lon + "}";
      filtMap.push("Lat = " + this.state.lat);
      filtMap.push("Lon = " + this.state.lon);
    }
    filter += "]";
    this.props.submit(filter, filtMap);
    this.props.toggle();
  }

  render() {
    return (
      <Modal 
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
      >
        <ModalHeader 
          toggle={this.props.toggle} className="popup-border">Filter</ModalHeader>
        <ModalBody className='popup'>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Ski Lifts >= </InputGroupAddon>
            <Input placeholder="Number of ski lifts"
                value={this.state.lifts}
                onChange={this.handleLiftChange}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Ski Runs >= </InputGroupAddon>
            <Input placeholder="Number of ski runs"
                value={this.state.runs}
                onChange={this.handleRunChange}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Elevation >= </InputGroupAddon>
            <Input placeholder="Elevation in meters"
                value={this.state.elev}
                onChange={this.handleElevChange}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Stars >=</InputGroupAddon>
            <Input placeholder="Yelp rating from 1 to 5"
                value={this.state.stars}
                onChange={this.handleStarChange}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Latitude:</InputGroupAddon>
            <Input placeholder="Latitude"
                value={this.state.lat}
                onChange={this.handleLatChange}/>
            <InputGroupAddon className="form-text" addonType="prepend">Longitude:</InputGroupAddon>
            <Input placeholder="Longitude"
                value={this.state.lon}
                onChange={this.handleLonChange}/>
          </InputGroup>
        </ModalBody>
        <ModalFooter className="popup-border">
          <Button color="primary" onClick={this.submitFilter}>Submit</Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}