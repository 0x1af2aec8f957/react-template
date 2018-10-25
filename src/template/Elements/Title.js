import React, { Component } from 'react'

export default class Title extends Component {
  static Subtitle ({className = '', size/*Number[1-6]*/, otherProps}) {
    return (
      <h2 className={`
      subtitle
      ${size ? `is-${size}` : ''}
      ${className}
      `} {...otherProps}/>
    )
  }

  render () {
    const {className = '', size/*Number[1-6]*/, spaced, ...otherProps} = this.props
    return (
      <h1 className={`
      title
      ${size ? `is-${size}` : ''}
      ${spaced ? `is-${spaced}` : ''}
      ${className}
      `} {...otherProps}/>
    )
  }
}