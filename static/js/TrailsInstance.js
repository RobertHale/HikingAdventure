// App.jsx
import React from   "react";
import NavBar from "./Navbar";
import $ from 'jquery';
import {
  Container} from 'reactstrap';
export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "",
      difficulty: "",
      length: 0,
      ascent: 0,
      descent: 0,
      sum: "",
      vid: "",
      list: 0,
      trailid: 0,
      dummy: 0
    };
    this.grabdata = this.grabdata.bind(this);
  }

  componentDidMount(){
    this.grabdata();
  }

  grabdata() {
    let trailid = 0;
    const url = window.location.href;
    const lastPart = url.split("/").pop();
    trailid = lastPart;

    const fetchfrom = "http://hikingadventures.me/api/trails/" + lastPart;


    $.getJSON(fetchfrom)
      .then(results => {
        let d = results.difficulty;
        if (d === "greenBlue") {
          d = "Easy/Intermediate";
        }

        if (d === "blue") {
          d = "Intermediate";
        }

        if (d === "green") {
          d = "Easy";
        }
        this.setState({
          name: results.name,
          difficulty: d,
          length: results.length,
          ascent: results.ascent,
          descent: results.descent,
          sum: results.summary,
          vid: results.youtubeid,
          trailid: trailid
        });
      });
    const fetchresort = fetchfrom + "/resorts";
    $.getJSON(fetchresort)
        .then(results => {
          const pad = {
            margin: '0px 0px 10px 0px',
          };
          let list = results.objects.map((resorts)=>{
            return (
              <a className="btn btn-primary" href={"http://hikingadventures.me/resorts/" + resorts.id}>{resorts.name}</a>
            )
          });
          this.setState({
            list:list
          });
        });
  }

  render () {
    const titles = {
      color: 'white',
      textAlign: 'center'
    };

    const center = {
      color: 'white',
      textAlign: 'center'
    };

    const left = {
      color: 'white',
      textAlign: 'left',
      display: 'inline'
    };

    const pad = {
      padding: '5px 5px 5px 5px'
    };

    const cardpad = {
      margin: '0px 0px 10px 0px'
    };


    return (
      <div>
      <NavBar/>
      <Container>
      <div id="title" className="row align-items-center">
  			<div className="col-12">
  				<h1 style={titles} id="name">{this.state.name}</h1>
          <br/>
  			</div>
  		</div>
      <div className="row justify-content-center">
        <div id="main" className="col-lg-6">
          <div style={cardpad} className="card cardbg">
            <div className="card-block">
            <h2 style={titles} className="card-title">Description:</h2>
              <ul>
                <li>
                  <h2 style={left} id="difficulty" className="card-title">Difficulty:</h2>
                  <h4 style={left}> {this.state.difficulty} </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="length" className="card-title">Length:</h2>
                    <h4 style={left}> {this.state.length} miles </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="elev" className="card-title">Elevation:</h2>
                    <h4 style={left}> {this.state.elevation}
                    <var style={titles} id="ascent">{this.state.ascent} foot ascent</var>
              			<br></br>
              			<var style={titles} id="descent">{this.state.descent} foot descent</var>
                    </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="description" className="card-title">Description:</h2>
                    <h4 style={left}> {this.state.sum} </h4>
                </li>
                <br/>
                <li>
                  <h2 style={left} id="description" className="card-title">
                    <a id="photo" className="btn btn-primary" href={"https://www.youtube.com/watch?v=" + this.state.vid}> Video Link</a>
                  </h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
        <iframe  width="538" height="440" src={"https://www.youtube.com/embed/" + this.state.vid} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
        </div>
      <div className="row">
      <div className="col-lg-6">
        <div style={cardpad} className="card cardbg h-10">
          <div className="card-block">
            <h2 style={titles} className="card-title">Nearby Resorts:</h2>
            <ul>
            <li>
            {this.state.list}
            </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div style={cardpad} className="card cardbg h-10">
          <div className="card-block">
            <h2 style={center} className="card-title">Photos:</h2>
            <ul>
            <li>
            <a id="photo" className="btn btn-primary" href={"http://hikingadventures.me/photos/" + this.state.trailid}>{this.state.name} Photos</a>
            </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
        </Container>
      </div>
    );
  }
}
