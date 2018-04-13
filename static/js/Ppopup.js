import React from "react";
import { InputGroup, InputGroupAddon, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Tpopup extends React.Component {
  constructor(){
    super();
    this.state = {
      lat: "",
      lon: ""
    };
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.submitFilter    = this.submitFilter.bind(this);
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
      // noinspection JSBitwiseOperatorUsage
    if (Tpopup.checkAndNotifyNumber(this.state.lat, "latitude", 0, 180) & Tpopup.checkAndNotifyNumber(this.state.lon, "longitude", -180, 0)) {
      filter += "{\"name\":\"lat\",\"op\":\"like\",\"val\":" + this.state.lat + "}";
      filter += ",";
      filter += "{\"name\":\"lon\",\"op\":\"like\",\"val\":" + this.state.lon + "}";
    }
    filter += "]";
    this.props.submit(filter);
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
            <InputGroupAddon className="form-text" addonType="prepend">Lat:</InputGroupAddon>
            <Input placeholder="Latitude"
                value={this.state.lat}
                onChange={this.handleLatChange}/>
            <InputGroupAddon className="form-text" addonType="prepend">Lon:</InputGroupAddon>
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