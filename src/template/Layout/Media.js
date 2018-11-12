import React, { Component } from 'react'
import classNames from 'classnames'

export default class Media extends Component {
  static Left ({className, ...otherProps}) {
    return (
      <div className={classNames('media-left', className)} {...otherProps}/>
    )
  }

  static Right ({className, ...otherProps}) {
    return (
      <figure className={classNames('media-right', className)} {...otherProps}/>
    )
  }

  static Content ({className, ...otherProps}) {
    return (
      <div className={classNames('media-content', className)} {...otherProps}/>
    )
  }

  render () {
    // The famous media object prevalent in social media interfaces, but useful in any context
    const {className, ...otherProps} = this.props
    return (
      <article className={classNames('media', className)} {...otherProps}/>
    )
  }
}