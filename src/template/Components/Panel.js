import React, { Component } from 'react'

export default class Panel extends Component {

  static Header ({className = '', ...otherProps}){return (
    <div className={`panel-heading ${className}`} {...otherProps}/>
  )}

  static Item ({className = '', active/*bool*/, ...otherProps}){return (
    <div className={`
    panel-block
    ${active ? 'is-active' : ''}
    ${className}`} {...otherProps}/>
  )}

  static Tabs ({className = '', ...otherProps}){return (
    <div className={`panel-tabs ${className}`} {...otherProps}/>
  )}

  render () {
    const {className = '', ...otherProps} = this.props
    return (
      <nav className={`panel ${className}`} {...otherProps}/>
    )
  }
}