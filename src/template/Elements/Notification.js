import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Notification extends Component {
  constructor ({defaultShowState/*bool*/}) {
    super(arguments[0])
    this.state = {
      showState: defaultShowState,
    }
  }

  handleClick () {
    const {onClose} = this.props
    this.setState({
      showState: !this.state.showState,
    }, () => !this.state.showState && onClose && onClose())
  }

  render () {
    const {color/*primary|link|info|success|warning|danger*/, className, children} = this.props
    return (
      this.state.showState && (
        <div className={classNames('notification', color && `is-${color}`,
          className)}>
          <button className="delete" onClick={this.handleClick}/>
          {children}
        </div>
      )
    )
  }
}

Notification.propTypes = {
  className: PropTypes.string,
  defaultShowState: PropTypes.bool,
  onClose: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'link', 'info', 'success', 'warning', 'danger']),
}

Notification.defaultPropType = {
  defaultShowState: false,
}