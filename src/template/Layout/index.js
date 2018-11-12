import React, { Component } from 'react'
import classNames from 'classnames'

export default class Layout extends Component {

  static Header ({className, ...otherProps}) {
    return (
      // Hero content: will be in the top
      <header className={classNames('hero-head', className)} {...otherProps}/>
    )
  }

  static Content ({className, ...otherProps}) {
    return (
      // Hero content: will be in the middle
      <div className={classNames('hero-body', className)} {...otherProps}/>
    )
  }

  static Footer ({className, ...otherProps}) {
    return (
      // Hero footer: will stick at the bottom
      <footer className={classNames('hero-foot', className)} {...otherProps}/>
    )
  }

  static Container ({className, ...otherProps}) {
    return (
      // A simple container to center your content horizontally
      <div className={classNames('container', className)} {...otherProps}/>
    )
  }

  render () {
    const {size/*medium|large|fullheight*/, bold, color, className: newClassName, ...otherProps} = this.props
    const className = classNames('hero', newClassName, {
      [`is-${size}`]: size,
      [`is-${color}`]: color,
      'is-bold': bold,
    })

    delete otherProps.computedMatch

    return (
      <section className={className} {...otherProps}/>
    )
  }
}

export { default as Level } from './Level'
export { default as Media } from './Media'
export { default as Footer } from './Footer'