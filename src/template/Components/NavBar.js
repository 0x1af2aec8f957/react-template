import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const switchClassList = (e) => {
  const el_self = e.target, el_menu = document.getElementById('navbar-menu')
  el_self.classList.toggle('is-active')
  el_menu.classList.toggle('is-active')
  return false
}

class Menu extends Component {
  static Start ({className, ...otherProps}) {
    return (
      <div className={classNames('navbar-start', className)} {...otherProps}/>
    )
  }

  static End ({className, ...otherProps}) {
    return (
      <div className={classNames('navbar-end', className)} {...otherProps}/>
    )
  }

  render () { // 汉堡菜单
    const {className, ...otherProps} = this.props
    return (
      <div className={classNames('navbar-menu', className)}
           id="navbar-menu" {...otherProps}/>
    )
  }
}

export default class NavBar extends Component {

  static Brand ({className, ...otherProps}) {
    return (
      <div className={classNames('navbar-brand', className)} {...otherProps}/>
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

  static Item ({className, active, ...otherProps}) {
    return (
      <div className={classNames('navbar-item', active && 'is-active',
        className)} {...otherProps}/>
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
      <div className={
        classNames(
          'navbar-item',
          'has-dropdow',
          {
            'is-hoverable': hover,
            [`has-dropdown-${dropDown}`]: dropDown,
          })
      }>
        <a className="navbar-link" onClick={
          event => !hover &&
            event.target.parentNode.classList.toggle('is-active')
        }>
          {label}
        </a>

        <div className={
          classNames(
            'navbar-dropdown',
            className,
            {
              'is-boxed': box,
              [`is-${direction}`]: direction,
            })
        } {...otherProps}/>
      </div>
    )
  }

  render () {
    const {transparent/*bool*/, className, direction/*top|bottom*/, color/*primary|link|info|success|warning|danger|black|dark|light|white*/, ...otherProps} = this.props
    return (
      <div className={
        classNames(
          'navbar',
          className,
          {
            [`is-${color}`]: color,
            [`is-fixed-${direction}`]: direction,
            'is-transparent': transparent,
          },
        )} role="navigation" aria-label="main navigation" {...otherProps}/>
    )
  }
}

Menu.propTypes = {
  className: PropTypes.string,
}

Menu.Start.propTypes = {
  className: PropTypes.string,
}

Menu.End.propTypes = {
  className: PropTypes.string,
}

NavBar.propTypes = {
  className: PropTypes.string,
  transparent: PropTypes.bool,
  direction: PropTypes.oneOf(['top', 'bottom']),
  color: PropTypes.oneOf([
    'primary',
    'link',
    'info',
    'success',
    'warning',
    'danger',
    'black',
    'dark',
    'light',
    'white']),
}

NavBar.Brand.propTypes = {
  className: PropTypes.string,
}

NavBar.Item.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
}

NavBar.Link.propTypes = {
  path: PropTypes.string,
  href: PropTypes.string,
}

NavBar.Dropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  hover: PropTypes.bool,
  box: PropTypes.bool,
  direction: PropTypes.oneOf(['right']),
  dropDown: PropTypes.oneOf(['up', 'down']),
}