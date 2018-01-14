import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToken, closeTokenEditor, editToken, setEditingToken } from './actions'
import { getTokenById } from './selectors'
import ColorPicker from './color-picker'

const mapStateToProps = (state, ownProps) => {
  const { tokens, field } = state;
  const props = getTokenById(state.tokens, field.editing)
  return (props) ? { ...props } : {}
}

class TokenEditor extends Component {

  constructor(props) {
    super(props);
    ['updateToken', 'close', 'handleForm'].forEach((m) => {
      this[m] = this[m].bind(this);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      console.log('new id');
    }

  }

  handleForm(e) {
    e.preventDefault();
    this.updateToken()
  }

  updateToken(color) {
    let updates = {
      type: this.tokenType.value,
      name: this.tokenName.value,
      atk: this.tokenAtk.value,
      def: this.tokenDef.value,
      abilities: this.tokenAbilities.value,
      color: color || this.props.color
    }
    if (!this.props.id) {
      updates.id = Date.parse(new Date());
      this.props.dispatch(addToken(updates))
      this.props.dispatch(setEditingToken(updates.id))
    } else {
      this.props.dispatch(editToken(this.props.id, updates))
    }
  }

  close(e) {
    e.preventDefault();
    this.props.dispatch(closeTokenEditor())
  }

  render() {
    const { id, type='', name='', atk='', def='', abilities='' } = this.props
    return (
      <div className="token-creature-editor">
        <form onSubmit={ this.handleForm } onChange={ this.handleForm }>
          <legend>Token Creature: { id }</legend>
          <fieldset>
            <ColorPicker onSelect={ this.updateToken } />
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
          <button onClick={ this.close }>DONE</button>
        </form>
      </div>
    );
  }
}


export default connect(mapStateToProps)(TokenEditor);
