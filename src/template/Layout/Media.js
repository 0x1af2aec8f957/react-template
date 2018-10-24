import React, { Component } from 'react'

export default class extends Component {
  static Left = ({className = '', ...otherProps}) => (
    <div className={`media-left ${className}`} {...otherProps}/>
  )
  static Right = ({className = '', ...otherProps}) => (
    <figure className={`media-right ${className}`} {...otherProps}/>
  )

  static Content = ({className = '', ...otherProps}) => (
    <div className={`media-content ${className}`} {...otherProps}/>
  )

  render () {
    // The famous media object prevalent in social media interfaces, but useful in any context
    const {className = '', ...otherProps} = this.props
    return (
      <article className={`media ${className}`} {...otherProps}/>
    )
  }
}