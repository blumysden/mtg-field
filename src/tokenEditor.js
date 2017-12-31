import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToken } from './actions'

const mapStateToProps = (state, ownProps) => {
  const { tokens } = state;
  return {
  }
}

class TokenEditor extends Component {

  constructor(props) {
    super(props);
    ['updateToken'].forEach((m) => {
      this[m] = this[m].bind(this);
    })
  }

  updateToken(e) {
    e.preventDefault();
    this.props.dispatch(addToken({
      type: this.tokenType.value
    }))
  }

  render() {
    const { id, type, atk, def } = this.props
    return (
      <div className="token-creature-editor">
        <form onSubmit={ this.updateToken }>
          <label>Type</label>
          <input type="text" value={ type } ref={ elem => this.tokenType = elem }/>
          <button>Save</button>
        </form>
      </div>
    );
  }
}


export default connect(mapStateToProps)(TokenEditor);
