import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Message extends Component {

  static Header ({className, ...otherProps}) {
    return (
      <div className={classNames('message-header', className)} {...otherProps}/>
    )
  }

  static Body ({className, ...otherProps}) {
    return (
      <div className={classNames('message-body', className)} {...otherProps}/>
    )
  }

  render () {
    const {className, color/*dark|primary|link|info|success|warning|danger*/, showState/*bool*/, size/*small|medium|large*/, ...otherProps} = this.props
    return (
      showState && (
        <article className={classNames('message', className,
          {[`is-${color}`]: color, [`is-${size}`]: size})}
                 {...otherProps}/>
      )
    )
  }
}

Message.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(
    ['dark', 'primary', 'link', 'info', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  showState: PropTypes.bool,

}

Message.Header.propTypes = Message.Body.propTypes = {
  className: PropTypes.string,
}