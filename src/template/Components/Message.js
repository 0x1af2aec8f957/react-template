import React, { Component } from 'react'
import classNames from 'classnames'

export default class Message extends Component {

  static Header ({className, ...otherProps}) {
    return (
      <div className={classNames('message-header', className)} {...otherProps}/>
    )
  }

  static Body ({className, ...otherProps}) {
    return (
      <div className={classNames('message-body', className)} {...otherProps}/>
    )
  }

  render () {
    const {className, color/*dark|primary|link|info|success|warning|danger*/, showState/*bool*/, size/*small|medium|large*/, ...otherProps} = this.props
    return (
      showState && (
        <article className={classNames('message', className, {[`is-${color}`]: color, [`is-${size}`]: size})}
                 {...otherProps}/>
      )
    )
  }
}