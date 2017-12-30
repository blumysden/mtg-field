import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLife, changeColor, toggleSettings } from './actions'
import './App.css';

const mapStateToProps = (state, ownProps) => {
  const { player, field } = state;
  return {
    lifePoints: player.lifePoints,
    fieldColor: field.color,
    settings: field.settings
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
    const { fieldColor, lifePoints, settings } = this.props
    return (
      <div className={ `field ${fieldColor} settings-${ (settings) ? 'on': 'off' }`}>
        <ul className="color-controls" onClick={ this.changeColor }>
          <li className="settings" onClick={ this.toggleSettings }></li>
          <li className="blue">Blue</li>
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
      </div>
    );
  }
}


export default connect(mapStateToProps)(App);
