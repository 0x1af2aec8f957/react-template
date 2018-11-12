import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Tag extends Component {
  static Group ({className, addons, ...otherProps}) {
    return (
      <div className={classNames('tags', addons && 'is-addons', className)}
           {...otherProps}/>
    )
  }

  render () {
    const {className, color/*black|dark|light|white|primary|link|info|success|warning|danger*/, size/*medium|large*/, delete: amputate, ...otherProps} = this.props
    return (
      <span className={
        classNames(
          'tag',
          className,
          {
            [`is-${color}`]: color,
            [`is-${size}`]: size,
            'is-delete': amputate,
          },
        )} {...otherProps}/>
    )
  }
}

Tag.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'black',
    'dark',
    'light',
    'white',
    'primary',
    'link',
    'info',
    'success',
    'warning',
    'danger']),
  size: PropTypes.oneOf(['medium', 'large']),
  delete: PropTypes.bool,
}