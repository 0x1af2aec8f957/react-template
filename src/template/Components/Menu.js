import React, { Component } from 'react'
import classNames from 'classnames'
import NavBar from './NavBar'

class MenuList extends Component {
  static Item ({className, children, active, ...otherProps}) {
    const son = React.Children.map(children, function ({type, props}) {
      return type === NavBar.Link
        ? React.cloneElement(arguments[0], {
          ...props,
          className: classNames(props.className, active && 'is-active'),
        })
        : arguments[0]
    })
    return (
      <li className={className} children={son} {...otherProps}/>
    )
  }

  render () {
    const {className, ...otherProps} = this.props
    return (
      <ul className={classNames('menu-list', className)} {...otherProps}/>
    )
  }
}

export default class Menu extends Component {
  static Label ({className, ...otherProps}) {
    return (
      <div className={classNames('menu-label', className)} {...otherProps}/>
    )
  }

  static MenuList = MenuList

  render () {
    const {className, ...otherProps} = this.props
    return (
      <aside className={classNames('menu', className)} {...otherProps}/>
    )
  }
}