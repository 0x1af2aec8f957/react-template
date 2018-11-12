import React, { Component } from 'react'
import classNames from 'classnames'

export default class Level extends Component {

  static Item ({className, ...otherProps}) {
    return (
      // A simple container to center your content horizontally
      <div className={classNames('level-item', className)} {...otherProps}/>
    )
  }

  static Left ({className, ...otherProps}) {
    return (
      // Left side
      <div className={classNames('level-left', className)} {...otherProps}/>
    )
  }

  static Right ({className, ...otherProps}) {
    return (
      // Right side
      <div className={classNames('level-right', className)} {...otherProps}/>
    )
  }

  render () {
    // A multi-purpose horizontal level, which can contain almost any other element
    const {className, fullWidth, ...otherProps} = this.props
    return (
      <div className={classNames('level', className)}
           style={{width: fullWidth ? '100%' : 'auto'}} {...otherProps}/>
    )
  }
}