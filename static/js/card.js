// App.jsx
import React from "react";
import { Button } from 'reactstrap';

export default class card extends React.Component {
  render () {
    return (
      <Button color="danger">
      {this.props.data.name}
      </Button>
      );
  }
}
