import React, { Component } from 'react'
import classNames from 'classnames'

export default class Title extends Component {
  static SubTitle ({className, color, align/*right|centered*/, size/*Number[1-6]*/, ...otherProps}) {
    return (
      <h2 className={
        classNames(
          'subtitle',
          className,
          {
            [`is-${size}`]: size,
            [`has-text-${align}`]: align,
            [`has-text-${color}`]: color,

          },
        )} {...otherProps}/>
    )
  }

  render () {
    const {className, color, align/*right|centered*/, size/*Number[1-6]*/, spaced, ...otherProps} = this.props
    return (
      <h1 className={
        classNames(
          'title',
          className,
          {
            [`is-${size}`]: size,
            [`has-text-${align}`]: align,
            [`is-${spaced}`]: spaced,
            [`has-text-${color}`]: color,
          },
        )} {...otherProps}/>
    )
  }
}