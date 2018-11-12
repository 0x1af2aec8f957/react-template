import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Panel extends Component {

  static Header ({className, ...otherProps}) {
    return (
      <div className={classNames('panel-heading', className)} {...otherProps}/>
    )
  }

  static Item ({className, active/*bool*/, ...otherProps}) {
    return (
      <div
        className={classNames('panel-block', active && 'is-active', className)}
        {...otherProps}/>
    )
  }

  static Tabs ({className, ...otherProps}) {
    return (
      <div className={classNames('panel-tabs', className)} {...otherProps}/>
    )
  }

  render () {
    const {className, ...otherProps} = this.props
    return (
      <nav className={classNames('panel', className)} {...otherProps}/>
    )
  }
}

Panel.propTypes = Panel.Header.propTypes = Panel.Tabs.propTypes = {
  className: PropTypes.string,
}

Panel.Item.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
}