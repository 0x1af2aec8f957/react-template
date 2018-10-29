import React, { Component } from 'react'

export default class Notification extends Component {
  constructor ({defaultShowState/*bool*/}) {
    super(arguments[0])
    this.state = {
      showState: defaultShowState,
    }
  }

  handelClick () {
    const {onClose} = this.props
    this.setState({
      showState: !this.state.showState,
    }, () => !this.state.showState && onClose && onClose())
  }

  render () {
    const {color/*primary|link|info|success|warning|danger*/, className = '', children} = this.props
    return (
      this.state.showState && (
        <div
          className={`notification ${color ? `is-${color}` : ''} ${className}`}>
          <button className="delete" onClick={this.handelClick}/>
          {children}
        </div>
      )
    )
  }
}