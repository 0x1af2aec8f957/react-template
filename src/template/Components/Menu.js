import React, { Component } from 'react'

class MenuList extends Component {
  static Item ({className = '', active, ...otherProps}) {
    return (
      <li className={`${active ? 'is-active' : ''} ${className}`}
          {...otherProps}/>
    )
  }

  render () {
    const {className = '', ...otherProps} = this.props
    return (
      <ul className={`menu-list ${className}`} {...otherProps}/>
    )
  }
}

export default class Menu extends Component {
  static Label ({className = '', ...otherProps}) {
    return (
      <div className={`menu-label ${className}`} {...otherProps}/>
    )
  }

  static MenuList = MenuList

  render () {
    const {className = '', ...otherProps} = this.props
    return (
      <aside className={`menu ${className}`} {...otherProps}/>
    )
  }
}