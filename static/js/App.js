// App.jsx
import React from   "react";
import Cards from   "./cards";
export default class App extends React.Component {
  constructor(){
    super();
    this.state = { trails: []}
  }
  componentWillMount() {
    this.setState({
      trails: [
        {
          name: "David",
          img: "img1"
        },
        {
          name: "Robert",
          img: "img2"
        },
        {
          name: "Adolfo",
          img: "img3"
        },
        {
          name: "Victor",
          img: "img4"
        },
        {
          name: "Alex",
          img: "img5"
        },
        {
          name: "Vamsi",
          img: "img6"
        }
      ]});
  }
  render () {
    return (
      <div>
        <p>Hello World!</p>
        <Cards trails={this.state.trails}/>
      </div>
    );
  }
}
