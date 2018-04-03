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
    }
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
  submitFilter(){
    var filter = "\"filters\":[";
    var notFirst = false;
    if (!(this.state.lifts === "") && !isNaN(this.state.lifts)) {
      if(!notFirst){
        notFirst = true;
      }
      filter += "{\"name\":\"lifts\",\"op\":\">=\",\"val\":" + this.state.lifts + "}";
    }
    if (!(this.state.runs === "") && !isNaN(this.state.runs)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"runs\",\"op\":\">=\",\"val\":" + this.state.runs + "}";
    }
    if (!(this.state.elev === "") && !isNaN(this.state.elev)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"elev\",\"op\":\">=\",\"val\":" + this.state.elev + "}";
    }
    if (!(this.state.stars === "") && !isNaN(this.state.stars)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"yelprating\",\"op\":\">=\",\"val\":" + this.state.stars + "}";
    }
    if (!(this.state.lat === "") && !(this.state.lon === "") && !isNaN(this.state.lat) && !isNaN(this.state.lon)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"lat\",\"op\":\"like\",\"val\":" + this.state.lat + "}";
      filter += ",";
      filter += "{\"name\":\"lon\",\"op\":\"like\",\"val\":" + this.state.lon + "}";
    }
    filter += "]";
    console.log(filter);
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
            <InputGroupAddon className="form-text" addonType="prepend"># of lifts >= </InputGroupAddon>
            <Input placeholder="GT" 
                value={this.state.lifts}
                onChange={this.handleLiftChange}/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend"># of ski runs >= </InputGroupAddon>
            <Input placeholder="GT"
                value={this.state.runs}
                onChange={this.handleRunChange}/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Elevation >= </InputGroupAddon>
            <Input placeholder="GT"
                value={this.state.elev}
                onChange={this.handleElevChange}/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Stars >=</InputGroupAddon>
            <Input placeholder="Stars"
                value={this.state.stars}
                onChange={this.handleStarChange}/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Lat:</InputGroupAddon>
            <Input placeholder="latitude"
                value={this.state.lat}
                onChange={this.handleLatChange}/>
            <InputGroupAddon className="form-text" addonType="prepend">Lon:</InputGroupAddon>
            <Input placeholder="longitude"
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