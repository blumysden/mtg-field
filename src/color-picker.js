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

  renderColors() {
    return ['blue', 'red', 'green', 'black', 'white'].map((color) => {
      let colorClass = `${color} ms ms-${ (color === 'blue') ? 'u' : color[0] }`
      if (this.props.selected === color) {
        colorClass += ' selected';
      }
      return <li className={ colorClass } data-color={ color } key={ `picker-${color}`}/>
    })
  }

  render() {
    return <ul className="color-controls" onClick={ this.changeColor }>
      { this.renderColors() }
    </ul>
  }
}

export default ColorPicker;
