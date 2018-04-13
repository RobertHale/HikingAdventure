import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class Tpopup extends React.Component {
  constructor(){
    super();
    this.state = {
      len: "",
      diff: "",
      asc: "",
      desc: "",
      stars: "",
      lat: "",
      lon: "",
      dropdownOpen: false
    };
    this.handleLenChange  = this.handleLenChange.bind(this);
    this.handleDiffChange = this.handleDiffChange.bind(this);
    this.handleAscChange  = this.handleAscChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handleLatChange  = this.handleLatChange.bind(this);
    this.handleLonChange  = this.handleLonChange.bind(this);
    this.toggleDropDown   = this.toggleDropDown.bind(this);
    this.submitFilter     = this.submitFilter.bind(this);
  }
  handleLenChange(e) {
    this.setState({len: e.target.value});
  }
  handleDiffChange(e) {
    this.setState({diff: e.target.value});
  }
  handleAscChange(e) {
    this.setState({asc: e.target.value});
  }
  handleDescChange(e) {
    this.setState({desc: e.target.value});
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
  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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
    let notFirst = false;
    if (Tpopup.checkAndNotifyNumber(this.state.len, "length", 0, 101)) {
      if(!notFirst){
        notFirst = true;
      }
      filter += "{\"name\":\"length\",\"op\":\">=\",\"val\":" + this.state.len + "}";
    }
    if (!(this.state.diff === "")) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"difficulty\",\"op\":\">=\",\"val\":\"" + this.state.diff + "\"}";
    }
    if (Tpopup.checkAndNotifyNumber(this.state.asc, "ascent", 0, 12500)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"ascent\",\"op\":\">=\",\"val\":" + this.state.asc + "}";
    }
    if (Tpopup.checkAndNotifyNumber(this.state.desc, "descent", -12500, 0)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"descent\",\"op\":\"<=\",\"val\":" + this.state.desc + "}";
    }
    if (Tpopup.checkAndNotifyNumber(this.state.stars, "rating", 0, 5)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"stars\",\"op\":\">=\",\"val\":" + this.state.stars + "}";
    }
    // noinspection JSBitwiseOperatorUsage
    if (Tpopup.checkAndNotifyNumber(this.state.lat, "latitude", 0, 180) & Tpopup.checkAndNotifyNumber(this.state.lon, "longitude", -180, 0)) {
      if(notFirst){
        filter +=",";
      }
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
            <InputGroupAddon className="form-text" addonType="prepend">Length >= </InputGroupAddon>
            <Input placeholder="Length of trail in miles"
                value={this.state.len}
                onChange={this.handleLenChange}/>
          </InputGroup>
          <br/>
            <InputGroup>
              <InputGroupAddon className="form-text" addonType="prepend">Difficulty:</InputGroupAddon>
              <InputGroupButtonDropdown addonType="append" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
              <DropdownToggle color="primary" caret>
                    Button Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem disabled>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Ascent >= </InputGroupAddon>
            <Input placeholder="Ascent in feet"
                value={this.state.asc}
                onChange={this.handleAscChange}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Descent >= </InputGroupAddon>
            <Input placeholder="Descent in feet"
                value={this.state.desc}
                onChange={this.handleDescChange}/>
          </InputGroup>
          <br/>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Stars >=</InputGroupAddon>
            <Input placeholder="Rating"
                value={this.state.stars}
                onChange={this.handleStarChange}/>
          </InputGroup>
          <br/>
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