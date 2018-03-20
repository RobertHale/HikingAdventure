// index.jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Navbar from "./navbar";
import Home from "./Home";
import About from "./About";
import Resorts from "./Resorts";
import Resortcard from "./Resortcard";
import Photos from "./Photos";
import Photocard from "./Photocard";
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';
// ReactDOM.render(<App />, document.getElementById("content"));

ReactDOM.render(
  <Router>
  <div>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route exact path= "/resorts:page?" component={Resorts} />
  <Route exact path= "/resorts/:id" component={App} />
  <Route exact path= "/trails:page?" component={App} />
  <Route exact path= "/trails/:id" component={App} />
  <Route exact path= "/photos:page?" component={Photos} />
  <Route exact path= "/photos/:id" component={App} />
  </div>
  </Router>,
  document.getElementById("content")
);
