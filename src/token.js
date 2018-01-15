import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEditingToken } from './actions'

const mapStateToProps = (state, ownProps) => {
  const { tokens } = state;
  const props = tokens.find((t) => t.id === ownProps.id)
  return (props) ? { ...props } : {}
}

class Token extends Component {

  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
  }

  edit(e) {
    this.props.dispatch(setEditingToken(this.props.id))
  }


  render() {
    const { name, id, color, type, atk, def } = this.props,
          colorClass = `token-color ${color} ms ms-${ (color === 'blue') ? 'u' : color[0] }`

    return (
      <div className={ `token-creature`} onClick={ this.edit }>
        <p>{ name }</p>
        <div className={ colorClass }/>
        <div className="stats">{ atk }/{ def }</div>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Token);
