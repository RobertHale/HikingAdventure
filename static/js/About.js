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
	this.getIssuesRecursive = this.getIssuesRecursive.bind(this);
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
        "tests": 6
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
	$.getJSON('https://api.github.com/repos/RobertHale/HikingAdventure/issues?state=all&per_page=100', function (results, textStatus, jqXHR){
  });
  var issueCount = 0;
  this.getIssuesRecursive('https://api.github.com/repos/RobertHale/HikingAdventure/issues?state=all&per_page=100&page=1', gitgroup, issueCount);
  
  }

  parseLinkString(links){
    let str = links;
    let next = str.search('next');
    let nextExists = false;
    if(next != -1){
      nextExists = true;
      str = str.substring(0,next);
      str = str.substring(str.lastIndexOf('<')+1, str.lastIndexOf('>'));
    }
    return {
      next: nextExists,
      page: str
    }
  }
  
  getIssuesRecursive(page, gitgroup, issueCount){
	  $.getJSON(page, function (results, textStatus, jqXHR)
	  {
      results.map(issue => {
        let i = 0;
        issueCount += 1;
        for(i;i < issue.assignees.length;i++){
          gitgroup[0][issue.assignees[i].login].issues += 1;
        }
      });
          this.setState({
            totalissues: issueCount,
            totaltests: 97,
            githubcont: gitgroup
          });
      var nextPage = this.parseLinkString(jqXHR.getResponseHeader('Link'));
      if(nextPage.next){
        this.getIssuesRecursive(nextPage.page, gitgroup, issueCount);
      }
    }.bind(this));
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
      <img className="profile-picture img-thumbnail equal-img" src="https://i.imgur.com/ZHPGrSu.jpg"/>
      <p className="text-center">
        <b>{"David Castilla"}</b>
      </p>
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
      <img className="profile-picture img-thumbnail equal-img" src="https://i.imgur.com/4jHX00q.jpg"/>
      <p className="text-center">
        <b>{"Alex Dai"}</b>
      </p>
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
      <img className="profile-picture img-thumbnail equal-img" src="https://i.imgur.com/mf7JSRj.jpg"/>
      <p className="text-center">
        <b>{"Robert Hale"}</b>
      </p>
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
      <img className="profile-picture img-thumbnail equal-img" src="https://i.imgur.com/6EY7d4x.jpg?1"/>
      <p className="text-center">
        <b>{"Adolfo Lopez"}</b>
      </p>
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
      <img className="profile-picture img-thumbnail equal-img" src="https://i.imgur.com/00OjoLZ.jpg"/>
      <p className="text-center">
        <b>{"Vamsi Ponakala"}</b>
      </p>
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
      <img className="profile-picture img-thumbnail equal-img" src="https://i.imgur.com/tJT9lrG.jpg"/>
      <p className="text-center">
        <b>{"Victor Yang"}</b>
      </p>
      <p>
      <b>
      {"Bio: "}
      </b>
      {"I'm a senior at UT majoring in Computer Science expecting to graduate at the end of this semester. My hobbies include video games and board games, and I also enjoy traveling."}
      </p>
      <p>
        <b>Responsibilities:</b> Backend
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
      <p><a href = "https://www.hikingproject.com/data"><b>{"www.hikingproject.com/data"}</b></a>{" - provides API for trail info and photos"}</p>
      <p><a href = "https://www.skimap.org"><b>{"www.skimap.org"}</b></a>{" - provide API for ski resorts and their information"}</p>
      <p><a href = "https://www.youtube.com"><b>{"www.youtube.com"}</b></a>{" - providing API for displaying related youtube videos"}</p>
      <p><a href = "https://www.yelp.com"><b>{"www.yelp.com"}</b></a>{" - providing API for displaying user reviews on resorts"}</p>
      <br/>

      <br/>
      <h3 className="title-text">Tools</h3>
      <br/>
      <p><a href = "https://reactjs.org/"><b>{"React"}</b></a>{" - for creating a dynamic front end"}</p>
      <p><a href = "https://github.com/ReactTraining/react-router"><b>{"React-router"}</b></a>{" - controls front end routing between different React Components"}</p>
      <p><a href = "https://reactstrap.github.io/"><b>{"Reactstrap"}</b></a>{" - provides usage of Bootstrap 4 components in React"}</p>
      <p><a href = "http://flask.pocoo.org/"><b>{"Flask"}</b></a>{" - for the backend of the website"}</p>
      <p><a href = "https://github.com/"><b>{"Github"}</b></a>{" - for maintaining our report and project organization"}</p>
      <p><a href = "https://slack.com/"><b>{"Slack"}</b></a>{" - for team communication and organization"}</p>
      <p><a href = "https://www.getpostman.com/"><b>{"Postman"}</b></a>{" - for organizing API calls"}</p>
      <p><a href = "https://aws.amazon.com/"><b>{"Amazon AWS"}</b></a>{" - for hosting website"}</p>
      <p><a href = "https://www.sqlalchemy.org/"><b>{"SQLAlchemy"}</b></a>{" - handles our back end API calls to our database"}</p>
      <p><a href = "https://flask-restless.readthedocs.io/en/stable/"><b>{"FlaskRestless"}</b></a>{" - handles our back end API and allows for specific database information"}</p>
      <br/>

      <br/>
      <p><b>{"Github: "}</b> <a href = "https://github.com/RobertHale/HikingAdventure">{"https://github.com/RobertHale/HikingAdventure"}</a></p>
      <p><b>{"Gitbook: "}</b> <a href = "https://roberthale.gitbooks.io/api/">{"https://roberthale.gitbooks.io/report/"}</a></p>
      <br/>

      </div>
    );
  }
}
