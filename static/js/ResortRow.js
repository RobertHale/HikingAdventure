// Card instance of Resort
import React from "react";
import ResortCard from './ResortCard';
import {
  Row} from 'reactstrap';

export default class Resortrow extends React.Component {
  render () {
    let rinstance;
    if(this.props.data){
      rinstance = this.props.data.map(single => {
        return(
          <ResortCard key={single.id} resort={single} highlight={this.props.highlight}/>
        );
      })
    }
    return (
      <div>
      <Row>
      {rinstance}
      </Row>
      </div>
    );
  }
}
