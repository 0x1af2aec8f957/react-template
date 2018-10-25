import React, { Component } from 'react'

export default class Message extends Component {

  static Header ({className = '', ...otherProps}) {
    return (
      <div className={`message-header ${className}`} {...otherProps}/>
    )
  }

  static Body ({className = '', ...otherProps}) {
    return (
      <div className={`message-body ${className}`} {...otherProps}/>
    )
  }

  render () {
    const {className = '', color/*dark|primary|link|info|success|warning|danger*/, showState/*bool*/, size/*small|medium|large*/, ...otherProps} = this.props
    return (
      showState && (
        <article className={`
        message ${color ? `is-${color}` : ''}
        ${size ? `is-${size}` : ''}
        ${className}
        `} {...otherProps}/>
      )
    )
  }
}