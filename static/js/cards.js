// App.jsx
import React from "react";
import Card from "./card";
export default class cards extends React.Component {
  constructor(){
    super();
  }
  componentWillMount() {
  }

  render () {
    let deck;
    if(this.props.trails){
      deck = this.props.trails.map(onecard => {
        return (
          <Card data={onecard} />
        );

      });
    }
    return (
      <div>
        {deck}
      </div>
    );
  }
}
