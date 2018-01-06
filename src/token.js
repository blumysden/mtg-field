import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * from './actions'

const mapStateToProps = (state, ownProps) => {
  const { tokens } = state;
  const props = tokens.find((t) => t.id === ownProps.id)
  return (props) ? { ...props } : {}
}

class Token extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { name, id } = this.props
    return (
      <div className="token-creature">
        <p>{ name }</p>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Token);
