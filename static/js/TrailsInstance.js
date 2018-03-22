// App.jsx
import React from   "react";
import Card from    "./card";
import Cards from   "./cards";
import $ from 'jquery';
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';
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


    }
    this.grabdata = this.grabdata.bind(this);
  }


  componentDidMount(){
    this.grabdata();
  }


  grabdata() {
    var i = 0;
    var n = 'ffjjffj';
    var d = '';
    var l = 0;
    var a = 0;
    var descent = 0;
    var sum = '';
    var vid = '';
    var resortid = {};
    var resortname = '';
    var trailid = 0;

    var url = window.location.href;
    var lastPart = url.split("/").pop();
    trailid = lastPart;

    var fetchfrom = "http://hikingadventures.me/api/trails/" + lastPart


    $.getJSON(fetchfrom)
      .then(results => {
        n = results.name;
        d = results.difficulty;
        l = results.length;
        a = results.ascent;
        descent = results.descent;
        sum = results.summary;
        vid = results.youtubeid;

        if (d == "greenBlue") {
          d = "Easy/Intermediate";
        }

        if (d == "blue") {
          d = "Intermediate";
        }

        if (d == "green") {
          d = "Easy";
        }
        this.setState({
          name: n,
          difficulty: d,
          length: l,
          ascent: a,
          descent: descent,
          sum: sum,
          vid: vid,
          trailid: trailid

        });

      });



      var fetchresort = fetchfrom + "/resorts";



      $.getJSON(fetchresort)
        .then(results => {
          var pad = {
            margin: '0px 0px 10px 0px',
          };
          let list = results.objects.map((resorts)=>{
            return (
              <a style = {pad} className="btn btn-primary" href={"http://hikingadventures.me/resorts/" + resorts.id}>{resorts.name}</a>

            )

          })

          this.setState({
            list:list
          });
        });






  }

  render () {

    var titles = {
      color:'white',
    };

    var center = {
      color: 'white',
      textAlign:'center'
    };

    var left = {
      color: 'white',
      textAlign:'left'
    };

    var pad = {
      padding: '5px 5px 5px 5px'
    };


    return (
      <div>
      <div id="title" className="row align-items-center">
  			<div className="col-12">
  				<h1 style={titles} id="name">{this.state.name}</h1>
          <br></br>
  			</div>
  		</div>



      <div className="row">
        <div id="main" className="col-lg-6">
          <div className="card cardbg">
            <iframe  width="540" height="500" src={"https://www.youtube.com/embed/" + this.state.vid} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <div className="card-block">
              <ul>
                <li>
                  <h2 style={left} id="difficulty" className="card-title">
                    Difficulty: {this.state.difficulty}
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="length" className="card-title">
                    Length: {this.state.length} miles
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="elev" className="card-title">
                    Elevation: {this.state.elevation}
                    <var style={titles} id="ascent">{this.state.ascent} foot ascent</var>
              			<br></br>
              			<var style={titles} id="descent">{this.state.descent} foot descent</var>
                  </h2>
                </li>
                <li>
                  <h2 style={left} id="description" className="card-title">
                    Description: {this.state.sum}
                  </h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card cardbg h-10">
            <div className="card-block">
              <h2 style={titles} className="card-title">Nearby Resorts:</h2>
              {this.state.list}
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card cardbg h-12">
            <div className="card-block">
              <h2 style={center} className="card-title">Photos:</h2>
              <a style={pad} id="photo" className="btn btn-primary" href={"http://hikingadventures.me/photos/" + this.state.trailid}>{this.state.name} Photos</a>
            </div>
          </div>
        </div>
        </div>





















      </div>
    );
  }
}
