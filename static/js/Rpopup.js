import React from "react";
import { InputGroup, InputGroupAddon, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Rpopup extends React.Component {
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
            <Input placeholder="GT"/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend"># of ski runs >= </InputGroupAddon>
            <Input placeholder="GT"/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Elevation >= </InputGroupAddon>
            <Input placeholder="GT"/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Stars greater than: </InputGroupAddon>
            <Input placeholder="Stars"/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="form-text" addonType="prepend">Lat:</InputGroupAddon>
            <Input placeholder="latitude"/>
            <InputGroupAddon className="form-text" addonType="prepend">Long:</InputGroupAddon>
            <Input placeholder="longitude"/>
          </InputGroup>
        </ModalBody>
        <ModalFooter className="popup-border">
          <Button color="primary">Submit</Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}