import React, { Component } from 'react'

export default class extends Component {

  static Header = ({className = '', ...otherProps}) => (
    // Hero content: will be in the top
    <header className={`hero-head ${className}`} {...otherProps}/>
  )

  static Content = ({className = '', ...otherProps}) => (
    // Hero content: will be in the middle
    <div className={`hero-body ${className}`} {...otherProps}/>
  )

  static Footer = ({className = '', ...otherProps}) => (
    // Hero footer: will stick at the bottom
    <footer className={`hero-foot ${className}`} {...otherProps}/>
  )

  static Container = ({className = '', ...otherProps}) => (
    // A simple container to center your content horizontally
    <div className={`container ${className}`} {...otherProps}/>
  )

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