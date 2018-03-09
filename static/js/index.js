// index.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Navbar from "./navbar"
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';
// ReactDOM.render(<App />, document.getElementById("content"));

ReactDOM.render(
  <Router>
  <div>
  <Route exact path="/welp" component={Navbar} />
  <Route path="/" component={App} />
  </div>
  </Router>,
  document.getElementById("content")
);
