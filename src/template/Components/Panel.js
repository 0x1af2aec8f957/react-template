import React, { Component } from 'react'

export default class extends Component {

  static Header = ({className = '', ...otherProps}) => (
    <div className={`panel-heading ${className}`} {...otherProps}/>
  )

  static Item = ({className = '', active/*bool*/, ...otherProps}) => (
    <div className={`
    panel-block
    ${active ? 'is-active' : ''}
    ${className}`} {...otherProps}/>
  )

  static Tabs = ({className = '', ...otherProps}) => (
    <div className={`panel-tabs ${className}`} {...otherProps}/>
  )

  render () {
    const {className = '', ...otherProps} = this.props
    return (
      <nav className={`panel ${className}`} {...otherProps}/>
    )
  }
}