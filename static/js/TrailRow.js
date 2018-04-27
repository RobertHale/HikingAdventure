// Card instance of Resort
import React from "react";
import TrailCard from './TrailCard';
import {
  Row} from 'reactstrap';

export default class TrailRow extends React.Component {
  render () {
    let tinstance;
    if(this.props.data){
      tinstance = this.props.data.map(single => {
        return(
          <TrailCard key={single.id} trail={single} highlight={this.props.highlight} />
        );
      })
    }
    return (
      <div>
      <Row>
      {tinstance};
      </Row>
      </div>
    );
  }
}
