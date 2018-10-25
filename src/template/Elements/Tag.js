import React, { Component } from 'react'

export default class Tag extends Component {
  static Group ({className = '', addons, ...otherProps}) {
    return (
      <div className={`
    tags
    ${addons ? 'is-addons' : ''}
    ${className}
    `} {...otherProps}/>
    )
  }

  render () {
    const {className = '', color/*black|dark|light|white|primary|link|info|success|warning|danger*/, size/*medium|large*/, delete: amputate, ...otherProps} = this.props
    return (
      <span className={`
      tag
      ${color ? `is-${color}` : ''}
      ${size ? `is-${size}` : ''}
      ${amputate ? 'is-delete' : ''}
      ${className}
      `} {...otherProps}/>
    )
  }
}