// App.jsx
import React from "react";
import { Button } from 'reactstrap';

export default class navbar extends React.Component {
  constructor(){
    super();
    this.state = {message: ""}
    this.changemessage = this.changemessage.bind(this);
  }
  changemessage(){
    this.setState({message: "hypertrigger"});
  }

  componentWillMount(){
    this.setState({message: "hello"});
  }

  render () {
    return (
      <div>
        {this.state.message}
        <Button onClick={this.changemessage} color="warning">Change State
        </Button>
      </div>
    );
  }
}
