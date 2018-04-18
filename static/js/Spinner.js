import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { Row } from 'reactstrap';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    // "ClimbingBoxLoader can be changed to any desired loading animation"
    return (
      <div className='sweet-loading'>
      <Row className="justify-content-center">
        <ClimbingBoxLoader
          color={'#D73695'}
          loading={this.state.loading}
          size={25}
        />
      </Row>
      </div>
    )
  }
}
