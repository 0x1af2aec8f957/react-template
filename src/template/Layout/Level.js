import React, { Component } from 'react'

export default class Level extends Component {

  static Item ({className = '', ...otherProps}) {
    return (
      // A simple container to center your content horizontally
      <div className={`level-item ${className}`} {...otherProps}/>
    )
  }

  static Left ({className = '', ...otherProps}) {
    return (
      // Left side
      <div className={`level-left ${className}`} {...otherProps}/>
    )
  }

  static Right ({className = '', ...otherProps}) {
    return (
      // Right side
      <div className={`level-right ${className}`} {...otherProps}/>
    )
  }

  render () {
    // A multi-purpose horizontal level, which can contain almost any other element
    const {className = '', ...otherProps} = this.props
    return (
      <div className={`level ${className}`} {...otherProps}/>
    )
  }
}