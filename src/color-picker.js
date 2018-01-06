import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ColorPicker extends Component {

  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(e) {
    const color = e.target.getAttribute('data-color');
    if (color) {
      this.props.onSelect(color);
    }
  }

  render() {
    return <ul className="color-controls" onClick={ this.changeColor }>
      <li className="blue ms ms-u" data-color="blue"></li>
      <li className="red ms ms-r" data-color="red"></li>
      <li className="green ms ms-g" data-color="green"></li>
      <li className="black ms ms-b" data-color="black"></li>
      <li className="white ms ms-w" data-color="white"></li>
    </ul>
  }
}

export default ColorPicker;
