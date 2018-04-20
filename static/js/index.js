// index.jsx
import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Resorts from "./Resorts";
import ResortInstance from "./ResortInstance";
import Photos from "./Photos";
import PhotoInstance from "./PhotoInstance";
import Trails from "./Trails";
import TrailsInstance from "./TrailsInstance";
import SearchResults from "./SearchResults";
import { BrowserRouter as Router, Route} from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.css';
// ReactDOM.render(<App />, document.getElementById("content"));

ReactDOM.render(
  <Router>
  <div>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/navbar" component={Navbar} />
  <Route exact path= "/resorts:page?" component={Resorts} />
  <Route exact path= "/resorts/:id" component={ResortInstance} />
  <Route exact path= "/trails:page?" component={Trails} />
  <Route exact path= "/trails/:id" component={TrailsInstance} />
  <Route exact path= "/photos:page?" component={Photos} />
  <Route exact path= "/photos/:id" component={PhotoInstance} />
  <Route exact path= "/search/:query" component={SearchResults} />
  </div>
  </Router>,
  document.getElementById("content")
);
