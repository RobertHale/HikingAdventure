// index.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Navbar from "./navbar";
import Home from "./Home";
import About from "./About";
import Resorts from "./Resorts";
import Resortcard from "./Resortcard";
import { Button } from 'reactstrap';
import Trails from "./Trails";
import $ from 'jquery';
import Trails_Straw from "./Trails_Straw";
import Trails_Aspen from "./Trails_Aspen";
import Practice from "./Practice";
import axios from 'axios';
import TrailsCard from './TrailsCard';
import tether from 'tether';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';
// ReactDOM.render(<App />, document.getElementById("content"));

ReactDOM.render(
  <Router>
  <div>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route exact path= "/trails/:place" component={Trails} />

  <Route exact path= "/resorts:page?" component={Resorts} />
  <Route exact path= "/resorts/:place" component={App} />
  </div>
  </Router>,
  document.getElementById("content")
);
