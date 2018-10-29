import React, { Component } from 'react'

export default class Layout extends Component {

  static Header ({className = '', ...otherProps}) {
    return (
      // Hero content: will be in the top
      <header className={`hero-head ${className}`} {...otherProps}/>
    )
  }

  static Content ({className = '', ...otherProps}) {
    return (
      // Hero content: will be in the middle
      <div className={`hero-body ${className}`} {...otherProps}/>
    )
  }

  static Footer ({className = '', ...otherProps}) {
    return (
      // Hero footer: will stick at the bottom
      <footer className={`hero-foot ${className}`} {...otherProps}/>
    )
  }

  static Container ({className = '', ...otherProps}) {
    return (
      // A simple container to center your content horizontally
      <div className={`container ${className}`} {...otherProps}/>
    )
  }

  render () {
    const {size/*medium|large|fullheight*/, bold, className: classNames = '', ...otherProps} = this.props
    const className = `
    hero 
    ${size ? `is-${size}` : ''} 
    ${bold ? 'is-bold' : ''} 
    ${classNames}
    `

    return (
      <section className={className} {...otherProps}/>
    )
  }
}

export { default as Level } from './Level'
export { default as Media } from './Media'
export { default as Footer } from './Footer'