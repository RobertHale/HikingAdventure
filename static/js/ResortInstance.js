// App.jsx
import React from   "react";
import Card from    "./card";
import Cards from   "./cards";
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';
export default class ResortInstance extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: 'Resort Instance'
    };
  }
  render () {
    return (
      <div>
      <div id="title" className="row align-items-center">
  			<div className="col-12">
  				<h1 id="name">Breckenridge</h1>
          <br></br>
  			</div>
  		</div>

      <div className="row">
        <div id="main" className="col-lg-6">
          <div className="card cardbg">
            <img className="card-img-top" src="https://skimap.org/data/510/2589/1510674068jpg_render.jpg" height="500" />
            <div className="card-block">
              <ul>
                <li>
                  <h2 id="coord" className="card-title">
                    Coordinates: 39.472250035504 -106.06571187716
                  </h2>
                </li>
                <li>
                  <h2 id="elev" className="card-title">
                    Elevation at Peak (meters): 3962
                  </h2>
                </li>
                <li>
                  <h2 id="runs" className="card-title">
                    total ski runs: 155
                  </h2>
                </li>
                <li>
                  <h2 id="lifts" className="card-title">
                    total lifts: 18
                  </h2>
                </li>
                <li>
                  <h2 id="review" className="card-title">
                    Reviews: 4 stars from 261 reviews
                  </h2>
                </li>
              </ul>
              <form id="web_link" action="https://www.breckenridge.com">
                  <input type="submit" className="btn btn-primary" value="Website" />
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card cardbg h-10">
            <div className="card-block">
              <h2 className="card-title">Nearby Trails:</h2>
              <a id="trail" className="btn btn-primary" href="http://www.hikingadventures.me/trails/3">Aspen Alley Trail</a>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card cardbg h-10">
            <div className="card-block">
              <h2 className="card-title">Photos:</h2>
              <a id="photo" className="btn btn-primary"
                href="http://www.hikingadventures.me/photos/3">Aspen Alley Trail photos</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{backgroundColor: 'slate blue', margin: 'auto', height:'300vh'}}>
           <div className="instance">
               <div className="panel">
                   <div className="panel-heading">
                       <h1>{this.state.title}</h1></div>
                       <br></br>
                       <br></br>
                       <br></br>
                   <div className="panel-body">
                       <Row>
                           <Col xs={7} md={7}>
                               {}
                               <h3 >Difficulty </h3>
                               <br></br>
                               <br></br>
                               <br></br>

                               <h3 >Description</h3>
                               <br></br>
                               <br></br>
                               <br></br>
                               {}
                               <h3 >Photographer</h3>
                           </Col>
                       </Row>

                       </div>
                   </div>
               </div>
           </div>
      </div>
    );
  }
}
