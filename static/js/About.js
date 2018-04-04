// App.jsx
import React from "react";
import {
  Button,
  Row,
  Col,
  Card
 } from 'reactstrap';
import $ from 'jquery';
import NavBar from "./Navbar";

export default class About extends React.Component {
  constructor(){
    super();
    this.state = {
      githubcont: [{"RobertHale":{
          "commits": "",
          "issues": "",
          "tests": ""
        },
        "davepcast":{
          "commits": "",
          "issues": "",
          "tests": ""
        },
        "duoALopez":{
          "commits": "",
          "issues": "",
          "tests": ""
        },
        "alexdai186":{
          "commits": "",
          "issues": "",
          "tests": ""
        },
        "victor40":{
          "commits": "",
          "issues": "",
          "tests": ""
        },
        "vponakala":{
          "commits": "",
          "issues": "",
          "tests": ""
        }
      }],
      githubstats: [{"total": ""},{"total": ""},{"total": ""},{"total": ""},{"total": ""},{"total": ""}],
      message: "",
      totalcommits: "",
      totalissues: "",
      totaltests: ""
    }
    this.changemessage = this.changemessage.bind(this);
    this.grabgitstats = this.grabgitstats.bind(this);
  }
  grabgitstats(){
    var totalc = 0;
    let gitgroup =
    [{"RobertHale":{
        "commits": 0,
        "issues": 0,
        "tests": 70
      },
      "davepcast":{
        "commits": 0,
        "issues": 0,
        "tests": 13
      },
      "duoALopez":{
        "commits": 0,
        "issues": 0,
        "tests": 0
      },
      "alexdai186":{
        "commits": 0,
        "issues": 0,
        "tests": 0
      },
      "victor40":{
        "commits": 0,
        "issues": 0,
        "tests": 1
      },
      "vponakala":{
        "commits": 0,
        "issues": 0,
        "tests": 14
      }
    }];
    var filler = [];
    let currentperson = '';
    $.getJSON('https://api.github.com/repos/RobertHale/HikingAdventure/stats/contributors').then(results => {
      results.map(individual => {
        totalc = totalc + individual.total;
        currentperson = individual.author.login;
        gitgroup[0][currentperson].commits = individual.total;
      });
      this.setState({
        githubstats: results,
        totalcommits: totalc,
        githubcont: gitgroup
      });
    });
    $.getJSON('https://api.github.com/repos/RobertHale/HikingAdventure/issues?state=all').then(results => {
        this.setState({
          totalissues: results[0].number,
          totaltests: 97
        });
      });
  }

  changemessage(){
    this.setState({message: "hypertrigger"});
    // {this.state.githubstats[0]['total']}
  }

  componentDidMount(){
    this.grabgitstats();

  }

  render () {
    const flow = this.state.githubstats.map(individual => (
        <div>
          <p>{individual.total}</p>
        </div>
    ));
    return (
      <div>
      <NavBar/>
      <Row className="justify-content-center">
      <h4 className="title-text">About</h4>
      <br/>
      </Row>

      <Row className="justify-content-center">
      <h4 className="title-text">Team: SWEat Victory</h4>
      <br/>
      </Row>

      <Row className="justify-content-center">

      <Col lg="4" md="4" sm="4">
      <img className="profile-picture img-thumbnail" src="https://i.imgur.com/ZHPGrSu.jpg"/>
      <p>
      <b>
      {"Bio: "}
      </b>
      {"I'm a 4th year Computer Science major at the University of Texas at Austin. In my free time I enjoy playing video games and meeting up with friends."}
      </p>
      <p>
        <b>Responsibilities: </b> Frontend
      </p>
      <p>
        <b># of Commits: </b> {this.state.githubcont[0].davepcast.commits}
      </p>
      <p>
        <b># of Issues: </b> {this.state.githubcont[0].davepcast.issues}
      </p>
      <p>
        <b># of Unit Tests: </b> {this.state.githubcont[0].davepcast.tests}
      </p>
      </Col>

      <Col lg="4" md="4" sm="4">
      <img className="profile-picture img-thumbnail" src="https://i.imgur.com/4jHX00q.jpg"/>
      <p>
      <b>
      {"Bio: "}
      </b>
      {"Hi! My name is Alex and I'm a Junior at the University of Texas at Austin, majoring in Computer Science. Some of my interests within Computer Science include Data Science and Machine Learning. In my free time, I enjoy fishing, playing basketball, playing poker, and hiking."}
      </p>

      <p>
        <b>Responsibilities:</b> Backend
      </p>

      <p>
        <b># of Commits: </b> {this.state.githubcont[0].alexdai186.commits}
      </p>

      <p>
        <b># of Issues: </b> {this.state.githubcont[0].alexdai186.issues}
      </p>

      <p>
        <b># of Unit Tests: </b> {this.state.githubcont[0].alexdai186.tests}
      </p>

      </Col>
      <Col lg="4" md="4" sm="4">
      <img className="profile-picture img-thumbnail" src="https://i.imgur.com/mf7JSRj.jpg"/>
      <p>
      <b>
      {"Bio: "}
      </b>
      {"Hello, my name is Robert Hale and I'm a Junior at the University of Texas at Austin. I'm majoring in Computer Science with a minor in business. Some of my interests are in backend development and mobile applications. Outside of computer science, I compete in gymnastics and wakeboarding."}
      </p>
      <p>
        <b>Responsibilities:</b> Backend
      </p>
      <p>
        <b># of Commits: </b> {this.state.githubcont[0].RobertHale.commits}
      </p>
      <p>
        <b># of Issues: </b> {this.state.githubcont[0].RobertHale.issues}
      </p>
      <p>
        <b># of Unit Tests: </b> {this.state.githubcont[0].RobertHale.tests}
      </p>
      </Col>
      </Row>

      <Row>
      <Col lg="4" md="4" sm="4">
      <img className="profile-picture img-thumbnail" src="https://i.imgur.com/F5Y7b3M.jpg"/>
      <p>
      <b>
      {"Bio: "}
      </b>
      {"I'm a third year Computer Science student. I'm a fan of beautiful design and simplicity in programming and products. Outside of CS, I'm an amateur aquarist with experience breeding invertebrates."}
      </p>
      <p>
        <b>Responsibilities:</b> Frontend
      </p>
      <p>
        <b># of Commits: </b> {this.state.githubcont[0].duoALopez.commits}
      </p>
      <p>
        <b># of Issues: </b> {this.state.githubcont[0].duoALopez.issues}
      </p>
      <p>
        <b># of Unit Tests: </b> {this.state.githubcont[0].duoALopez.tests}
      </p>
      </Col>
      <Col lg="4" md="4" sm="4">
      <img className="profile-picture img-thumbnail" src="https://i.imgur.com/00OjoLZ.jpg"/>
      <p>
      <b>
      {"Bio: "}
      </b>
      {"My name is Vamsi Ponakala, and I'm a junior at UT who is majoring in Computer Science. Some of my interests include learning about history, playing tennis and playing video games in my spare time."}
      </p>
      <p>
        <b>Responsibilities:</b> Frontend
      </p>
      <p>
        <b># of Commits: </b> {this.state.githubcont[0].vponakala.commits}
      </p>
      <p>
        <b># of Issues: </b> {this.state.githubcont[0].vponakala.issues}
      </p>
      <p>
        <b># of Unit Tests: </b> {this.state.githubcont[0].vponakala.tests}
      </p>
      </Col>

      <Col lg="4" md="4" sm="4">
      <img className="profile-picture img-thumbnail" src="https://i.imgur.com/zkxl05U.jpg"/>
      <p>
      <b>
      {"Bio: "}
      </b>
      {"I'm a senior at UT majoring in Computer Science expecting to graduate at the end of this semester. My hobbies include video games and board games, and I also enjoy traveling."}
      </p>
      <p>
        <b>Responsibilities:</b> Frontend
      </p>
      <p>
        <b># of Commits: </b> {this.state.githubcont[0].victor40.commits}
      </p>
      <p>
        <b># of Issues: </b> {this.state.githubcont[0].victor40.issues}
      </p>
      <p>
        <b># of Unit Tests: </b> {this.state.githubcont[0].victor40.tests}
      </p>
      </Col>
      </Row>

      <br/>
      <h3 className="title-text">Total Stats</h3>
      <br/>
      <p><b>{"Total Commits: "} {this.state.totalcommits}</b></p>
      <p><b>{"Total Issues: "} {this.state.totalissues}</b></p>
      <p><b>{"Total Unit Tests: "} {this.state.totaltests}</b></p>
      <br/>

      <br/>
      <h3 className="title-text">Sources</h3>
      <br/>
      <p><b>{"www.hikingproject.com/data"}</b>{" - provides API for trail info and photos"}</p>
      <p><b>{"www.skimap.org"}</b>{" - provide API for ski resorts and their information"}</p>
      <p><b>{"www.youtube.com"}</b>{" - providing API for displaying related youtube videos"}</p>
      <p><b>{"www.yelp.com"}</b>{" - providing API for displaying user reviews on resorts"}</p>
      <br/>

      <br/>
      <h3 className="title-text">Tools</h3>
      <br/>
      <p><b>{"React"}</b>{" - for creating a dynamic front end"}</p>
      <p><b>{"React-router"}</b>{" - controls front end routing between different React Components"}</p>
      <p><b>{"Reactstrap"}</b>{" - provides usage of Bootstrap 4 components in React"}</p>
      <p><b>{"Flask"}</b>{" - for the backend of the website"}</p>
      <p><b>{"Github"}</b>{" - for maintaining our report and project organization"}</p>
      <p><b>{"Slack"}</b>{" - for team communication and organization"}</p>
      <p><b>{"Postman"}</b>{" - for organizing API calls"}</p>
      <p><b>{"Amazon AWS"}</b>{" - for hosting website"}</p>
      <p><b>{"MySQLAlchemy"}</b>{" - handles our back end API calls to our database"}</p>
      <p><b>{"FlaskRestless"}</b>{" - handles our back end API and allows for specific database information"}</p>
      <br/>

      <br/>
      <p><b>{"Github: "}</b> <a href = "https://github.com/RobertHale/HikingAdventure">{"https://github.com/RobertHale/HikingAdventure"}</a></p>
      <p><b>{"Gitbook: "}</b> <a href = "https://roberthale.gitbooks.io/api/">{"https://roberthale.gitbooks.io/report/"}</a></p>
      <br/>

      </div>
    );
  }
}
