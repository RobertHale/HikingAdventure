import React from "react";
import { InputGroup, InputGroupAddon, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
      lon: ""
    }
    this.handleLenChange  = this.handleLenChange.bind(this);
    this.handleDiffChange = this.handleDiffChange.bind(this);
    this.handleAscChange  = this.handleAscChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleStarChange = this.handleStarChange.bind(this);
    this.handleLatChange  = this.handleLatChange.bind(this);
    this.handleLonChange  = this.handleLonChange.bind(this);
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
  submitFilter(){
    var filter = "\"filters\":[";
    var notFirst = false;
    if (!(this.state.len === "") && !isNaN(this.state.len)) {
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
    if (!(this.state.asc === "") && !isNaN(this.state.asc)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"ascent\",\"op\":\">=\",\"val\":" + this.state.asc + "}";
    }
    if (!(this.state.desc === "") && !isNaN(this.state.desc)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"descent\",\"op\":\">=\",\"val\":" + this.state.desc + "}";
    }
    if (!(this.state.stars === "") && !isNaN(this.state.stars)) {
      if(notFirst){
        filter +=",";
      }else{
        notFirst = true;
      }
      filter += "{\"name\":\"stars\",\"op\":\">=\",\"val\":" + this.state.stars + "}";
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
            <InputGroupAddon className="form-text" addonType="prepend">Length of trail >= </InputGroupAddon>
            <Input placeholder="GT" 
                value={this.state.len}
                onChange={this.handleLenChange}/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Difficulty:</InputGroupAddon>
            <Input placeholder="GT"
                value={this.state.diff}
                onChange={this.handleDiffChange}/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Ascent >= </InputGroupAddon>
            <Input placeholder="GT"
                value={this.state.asc}
                onChange={this.handleAscChange}/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Descent >= </InputGroupAddon>
            <Input placeholder="GT"
                value={this.state.desc}
                onChange={this.handleDescChange}/>
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