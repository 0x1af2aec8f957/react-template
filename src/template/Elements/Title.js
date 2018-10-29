import React, { Component } from 'react'

export default class Title extends Component {
  static SubTitle ({className = '', align/*right|centered*/, size/*Number[1-6]*/, ...otherProps}) {
    return (
      <h2 className={`
      subtitle
      ${size ? `is-${size}` : ''}
      ${align ? `has-text-${align}` : ''}
      ${className}
      `} {...otherProps}/>
    )
  }

  render () {
    const {className = '', align/*right|centered*/, size/*Number[1-6]*/, spaced, ...otherProps} = this.props
    return (
      <h1 className={`
      title
      ${size ? `is-${size}` : ''}
      ${align ? `has-text-${align}` : ''}
      ${spaced ? `is-${spaced}` : ''}
      ${className}
      `} {...otherProps}/>
    )
  }
}