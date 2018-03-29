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
          toggle={this.props.toggle}>Filter</ModalHeader>
        <ModalBody className='popup'>
          <p># of lifts:</p>
          <InputGroup>
            <InputGroupAddon className="text-white" addonType="prepend">Lower Bound: </InputGroupAddon>
            <Input placeholder="GT"/>
            <InputGroupAddon className="text-white" addonType="prepend"> Upper Bound: </InputGroupAddon>
            <Input placeholder="LT"/>
          </InputGroup>
          <br></br>
          <InputGroup>
            <InputGroupAddon className="text-white" addonType="prepend">Stars greater than: </InputGroupAddon>
            <Input placeholder="Stars"/>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Submit</Button>
          <Button color="secondary" onClick={this.props.toggle}>close me</Button>
        </ModalFooter>
      </Modal>
    );
  }
}