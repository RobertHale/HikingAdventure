// App.jsx
import React from "react";


export default class card extends React.Component {
  render () {
    return (
      <div>
      {this.props.data.name}
      </div>);
  }
}
