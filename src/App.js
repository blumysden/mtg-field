import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLife, changeColor, toggleSettings, editToken } from './actions'
import './App.css';
import 'mana-font/css/mana.css'
import Token from './token'
import TokenEditor from './tokenEditor'
import ColorPicker from './color-picker'

const mapStateToProps = (state, ownProps) => {
  const { player, field, tokens } = state;
  // console.log('msp', tokens);
  return {
    lifePoints: player.lifePoints,
    fieldColor: field.color,
    settings: field.settings,
    editing: field.editing,
    tokens
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.addOneLife = this.addOneLife.bind(this);
    this.subtractOneLife = this.subtractOneLife.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.newToken = this.newToken.bind(this);
  }

  componentWillReceiveProps(newProps) {
    console.log('new props?', newProps);
  }

  addOneLife() {
    this.props.dispatch(changeLife(1))
  }

  subtractOneLife() {
    this.props.dispatch(changeLife(-1))
  }

  changeColor(color) {
    this.props.dispatch(changeColor(color));
  }

  toggleSettings() {
    this.props.dispatch(toggleSettings())
  }

  newToken() {
    this.props.dispatch(editToken())
  }

  render() {
    const { fieldColor, lifePoints, settings, tokens, editing } = this.props
    console.log('how many tokens?', tokens);
    return (
      <div>
        <div className={ `bg-mask ${fieldColor}`}></div>
        <div className={ `field settings-${ (settings) ? 'on': 'off' } editing-${ (editing === false) ? 'off': 'on' }`}>
          <ColorPicker onSelect={ this.changeColor } />
          <div className="player">
            <button className="life-stats" onClick={ this.subtractOneLife }>-</button>
            <span className="life-points life-stats">{ lifePoints }</span>
            <button className="life-stats" onClick={ this.addOneLife }>+</button>
          </div>
          <div className="battlefield">
            <div className="deck" onClick={ this.newToken }></div>
            { tokens.map((t) => <Token id={ t.id }/>) }
            <TokenEditor />
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps)(App);
