import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * from './actions'

const mapStateToProps = (state, ownProps) => {
  const { tokens } = state;
  return {
  }
}

class Token extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="token-creature">
        <p>RAR</p>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Token);
