import React, { Component } from 'react'
import classNames from 'classnames'
import NavBar from './NavBar'

export default class Breadcrumb extends Component {

  static Item ({active/*bool*/, className, ...otherProps}) {
    return (
      <li className={classNames(active && 'is-active', className)}>
        <NavBar.Link {...otherProps}/>
      </li>
    )
  }

  render () {
    const {className, align/*centered|right*/, separator/*arrow|bullet|dot|succeeds*/, size/*small|medium|large*/, ...otherProps} = this.props
    return (
      <nav className={
        classNames(
          'breadcrumb',
          className,
          {
            [`is-${align}`]: align,
            [`has-${separator}-separator`]: separator,
            [`is-${size}`]: size,
          })
      } aria-label="breadcrumbs">
        <ul {...otherProps}/>
      </nav>
    )
  }
}