import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToken, closeTokenEditor } from './actions'
import ColorPicker from './color-picker'

const mapStateToProps = (state, ownProps) => {
  const { tokens } = state;
  return {
  }
}

class TokenEditor extends Component {

  constructor(props) {
    super(props);
    ['updateToken', 'cancel'].forEach((m) => {
      this[m] = this[m].bind(this);
    })
  }

  updateToken(e) {
    e.preventDefault();
    this.props.dispatch(addToken({
      id: Date.parse(new Date()),
      type: this.tokenType.value,
      name: this.tokenName.value,
      atk: this.tokenAtk.value,
      def: this.tokenDef.value,
      abilities: this.tokenAbilities.value
    }))
    this.cancel(e);
  }

  cancel(e) {
    e.preventDefault();
    this.props.dispatch(closeTokenEditor())
  }

  render() {
    const { id, type=null, name=null, atk, def, abilities } = this.props
    return (
      <div className="token-creature-editor">
        <form onSubmit={ this.updateToken }>
          <legend>Token Creature</legend>
          <fieldset>
            <ColorPicker onSelect={ () => {} } />
            <label>Type</label>
            <input type="text" value={ type } ref={ elem => this.tokenType = elem }/>
            <label>Name</label>
            <input type="text" value={ name } ref={ elem => this.tokenName = elem }/>
            <label>Abilities</label>
            <input type="text" value={ abilities } ref={ elem => this.tokenAbilities = elem }/>
          </fieldset>
          <fieldset className="strength">
            <label>Attributes</label>
            <input type="text" value={ atk } ref={ elem => this.tokenAtk = elem }/>/
            <input type="text" value={ def } ref={ elem => this.tokenDef = elem }/>
          </fieldset>
          <button onClick={ this.cancel }>Cancel</button>
          <button>Save</button>
        </form>
      </div>
    );
  }
}


export default connect(mapStateToProps)(TokenEditor);
