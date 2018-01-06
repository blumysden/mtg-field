import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLife, changeColor, toggleSettings } from './actions'
import './App.css';
import 'mana-font/css/mana.css'
import Token from './token'
import TokenEditor from './tokenEditor'

const mapStateToProps = (state, ownProps) => {
  const { player, field, tokens } = state;
  console.log('msp', tokens);
  return {
    lifePoints: player.lifePoints,
    fieldColor: field.color,
    settings: field.settings,
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

  changeColor(e) {
    const color = e.target.innerText.toLowerCase();
    if (color) {
      this.props.dispatch(changeColor(color));
    }
  }

  toggleSettings() {
    this.props.dispatch(toggleSettings())
  }

  render() {
    const { fieldColor, lifePoints, settings, tokens } = this.props
    console.log('how many tokens?', tokens);
    return (
      <div>
        <div className={ `bg-mask ${fieldColor}`}></div>
        <div className={ `field settings-${ (settings) ? 'on': 'off' }`}>
          <ul className="color-controls" onClick={ this.changeColor }>
            <li className="settings" onClick={ this.toggleSettings }></li>
            <li className="blue ms ms-u">Blue</li>
            <li className="red">Red</li>
            <li className="green">Green</li>
            <li className="black">Black</li>
            <li className="white">White</li>
          </ul>
          <div className="player">
            <button className="life-stats" onClick={ this.subtractOneLife }>-</button>
            <span className="life-points life-stats">{ lifePoints }</span>
            <button className="life-stats" onClick={ this.addOneLife }>+</button>
          </div>
          <div className="battlefield">
            <p>MANA! <span className="ms ms-u"></span></p>
            { tokens.map((t) => <Token id={ t.id }/>) }
            <TokenEditor />
          </div>
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps)(App);
