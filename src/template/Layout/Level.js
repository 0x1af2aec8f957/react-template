import React, { Component } from 'react'

export default class extends Component {

  static Item = ({className = '', ...otherProps}) => (
    // A simple container to center your content horizontally
    <div className={`level-item ${className}`} {...otherProps}/>
  )

  static Left = ({className = '', ...otherProps}) => (
    // Left side
    <div className={`level-left ${className}`} {...otherProps}/>
  )

  static Right = ({className = '', ...otherProps}) => (
    // Right side
    <div className={`level-right ${className}`} {...otherProps}/>
  )

  render () {
    // A multi-purpose horizontal level, which can contain almost any other element
    const {className = '', ...otherProps} = this.props
    return (
      <div className={`level ${className}`} {...otherProps}/>
    )
  }
}