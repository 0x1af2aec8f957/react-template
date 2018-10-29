import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const switchClassList = (e) => {
  const el_self = e.target, el_menu = document.getElementById('navbar-menu')
  el_self.classList.toggle('is-active')
  el_menu.classList.toggle('is-active')
  return false
}

class Menu extends Component {
  static Start ({className = '', ...otherProps}) {
    return (
      <div className={`navbar-start ${className}`} {...otherProps}/>
    )
  }

  static End ({className = '', ...otherProps}) {
    return (
      <div className={`navbar-end ${className}`} {...otherProps}/>
    )
  }

  render () { // 汉堡菜单
    const {className = '', ...otherProps} = this.props
    return (
      <div className={`navbar-menu ${className}`}
           id="navbar-menu" {...otherProps}/>
    )
  }
}

export default class NavBar extends Component {

  static Brand ({className = '', ...otherProps}) {
    return (
      <div className={`navbar-brand ${className}`} {...otherProps}/>
    ) // 导航栏左侧
  }

  static Burger () {
    return (
      <div className="navbar-burger burger" onClick={switchClassList}>
        <span/><span/><span/>
      </div>
    ) // 汉堡菜单
  }

  static Menu = Menu

  static Item ({className = '', active, ...otherProps}) {
    return (
      <div className={`
      navbar-item
      ${active ? 'is-active' : ''}
      ${className}
      `} {...otherProps}/>
    )
  }

  static Link ({path, href, ...otherProps}) {
    return (
      href
        ? (<a href={href} {...otherProps}/>)
        : path
        ? (<Link to={path}  {...otherProps}/>)
        : null
    )
  }

  static Divider () {return (<hr className="navbar-divider"/>)}

  static Dropdown ({label, hover/*boll*/, box/*bool*/, direction/*right*/, dropDown/*up|down*/, className, ...otherProps}) {
    return (
      <div className={`
    navbar-item
    has-dropdow
    ${hover ? 'is-hoverable' : ''}
    ${dropDown ? `has-dropdown-${dropDown}` : ''}
      `}>
        <a className="navbar-link" onClick={
          event => !hover &&
            event.target.parentNode.classList.toggle('is-active')
        }>
          {label}
        </a>

        <div className={`
      navbar-dropdown
      ${box ? 'is-boxed' : ''}
      ${direction ? `is-${direction}` : ''}
      ${className}
      `} {...otherProps}/>
      </div>
    )
  }

  render () {
    const {transparent/*bool*/, className = '', direction/*top|bottom*/, color/*primary|link|info|success|warning|danger|black|dark|light|white*/, ...otherProps} = this.props
    return (
      <div className={`
      navbar
      ${color ? `is-${color}` : ''}
      ${transparent ? 'is-transparent' : ''}
      ${direction ? `is-fixed-${direction}` : ''}
      ${className}
      `} role="navigation" aria-label="main navigation" {...otherProps}/>
    )
  }
}