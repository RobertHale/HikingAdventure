// App.jsx
import React from "react";
import {
  Button,
  Row,
  Col,
  Card
 } from 'reactstrap';
import $ from 'jquery';

export default class About extends React.Component {
  constructor(){
    super();
    this.state = {
      githubcont: [],
      githubstats: [{"total": ""},{"total": ""},{"total": ""},{"total": ""},{"total": ""},{"total": ""}],
      message: "",
      totalcommits: 0,
      totalissues: 0,
      totaltests: 0
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
        "tests": 0
      },
      "davepcast":{
        "commits": 0,
        "issues": 0,
        "tests": 0
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
        "tests": 0
      },
      "vponakala":{
        "commits": 0,
        "issues": 0,
        "tests": 0
      }
    }];
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

      <Row className="justify-content-center">
      <h4>About</h4>
      </Row>

      <Row className="justify-content-center">
      <h4>Team: SWEat Victory</h4>
      </Row>

      <Row className="justify-content-center">

      <Col lg="4" md="6">
      <img className="profile-picture" src="https://i.imgur.com/ZHPGrSu.jpg"/>
      <p>
      <b>
      {"Bio:"}
      </b>
      {"I'm a 4th year Computer Science major at the University of Texas at Austin. In my free time I enjoy playing video games and meeting up with friends."}
      </p>
      <p>
        <b>Responsibilities:</b> Frontend
      </p>
      <p>
        <b># of Commits:</b>
      </p>
      <p>
        <b># of Issues:</b> 1
      </p>
      <p>
        <b># of Unit Tests:</b> 0
      </p>
      </Col>

      <Col lg="4" md="6">
      <img className="profile-picture" src="https://i.imgur.com/4jHX00q.jpg"/>
      <p>
      <b>
      {"Bio:"}
      </b>
      {"Hi! My name is Alex and I'm a Junior at the University of Texas at Austin, majoring in Computer Science. Some of my interests within Computer Science include Data Science and Machine Learning. In my free time, I enjoy fishing, playing basketball, playing poker, and hiking."}
      </p>

      <p>
        <b>Responsibilities:</b> Backend
      </p>

      <p>
        <b># of Commits:</b>{this.state.githubstats[1].total}
      </p>

      <p>
        <b># of Issues:</b> 1
      </p>

      <p>
        <b># of Unit Tests:</b> 0
      </p>

      </Col>
      <Col lg="4" md="6">
      <img className="profile-picture" src="https://i.imgur.com/mf7JSRj.jpg"/>
      <p>
      <b>
      {"Bio:"}
      </b>
      {"Hello, my name is Robert Hale and I'm a Junior at the University of Texas at Austin. I'm majoring in Computer Science with a minor in business. Some of my interests are in backend development and mobile applications. Outside of computer science, I compete in gymnastics and wakeboarding."}
      </p>
      <p>
        <b>Responsibilities:</b> Backend
      </p>
      <p>
        <b># of Commits:</b>{this.state.githubstats[3].total}
      </p>
      <p>
        <b># of Issues:</b> 1
      </p>
      <p>
        <b># of Unit Tests:</b> 0
      </p>
      </Col>
      </Row>

      <Row>
      <Col lg="4" md="6">
      <img className="profile-picture" src="https://i.imgur.com/F5Y7b3M.jpg"/>
      <p>
      <b>
      {"Bio:"}
      </b>
      {"I'm a third year Computer Science student. I'm a fan of beautiful design and simplicity in programming and products. Outside of CS, I'm an amateur aquarist with experience breeding invertebrates."}
      </p>
      <p>
        <b>Responsibilities:</b> Frontend
      </p>
      <p>
        <b># of Commits:</b>{this.state.githubstats[0].total}
      </p>
      <p>
        <b># of Issues:</b> 1
      </p>
      <p>
        <b># of Unit Tests:</b> 0
      </p>
      </Col>
      <Col lg="4" md="6">
      <img className="profile-picture" src="https://i.imgur.com/00OjoLZ.jpg"/>
      <p>
      <b>
      {"Bio:"}
      </b>
      {"My name is Vamsi Ponakala, and I'm a junior at UT who is majoring in Computer Science. Some of my interests include learning about history, playing tennis and playing video games in my spare time."}
      </p>
      <p>
        <b>Responsibilities:</b> Frontend
      </p>
      <p>
        <b># of Commits:</b>
      </p>
      <p>
        <b># of Issues:</b> 1
      </p>
      <p>
        <b># of Unit Tests:</b> 0
      </p>
      </Col>

      <Col lg="4" md="6">
      <img className="profile-picture" src="https://i.imgur.com/zkxl05U.jpg"/>
      <p>
      <b>
      {"Bio:"}
      </b>
      {"I'm a senior at UT majoring in Computer Science expecting to graduate at the end of this semester. My hobbies include video games and board games, and I also enjoy traveling."}
      </p>
      <p>
        <b>Responsibilities:</b> Frontend
      </p>
      <p>
        <b># of Commits:</b>{this.state.githubstats[2].total}
      </p>
      <p>
        <b># of Issues:</b> 1
      </p>
      <p>
        <b># of Unit Tests:</b> 0
      </p>
      </Col>

      </Row>

      <p>{this.state.totalcommits}</p>
      {flow}
      </div>
    );
  }
}
