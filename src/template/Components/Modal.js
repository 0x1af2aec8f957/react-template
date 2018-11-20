import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Modal extends Component {

  constructor ({defaultShow/*bool*/}) {
    super(arguments[0])
    this.state = {
      showState: defaultShow,
    }
  }

  componentWillReceiveProps ({show: showState}) {
    if (showState !== this.props.show) this.setState({showState})
  }

  handleClose = (closeType = true) => {
    const {onClose} = this.props
    this.setState({
      showState: !this.state.showState,
    }, () => closeType && onClose && onClose())
  }

  render () {
    const {className, defaultShow, show, mode/*card*/, title, onOk, OnCancel, ...otherProps} = this.props
    return (
      <div className={classNames('modal', className, this.state.showState && 'is-active')}>
        <div className="modal-background" onClick={this.handleClose}/>
        {
          mode === 'card' ? (
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">{title}</p>
                <button className="delete"
                        aria-label="close"
                        onClick={this.handleClose}/>
              </header>
              <section className="modal-card-body" {...otherProps}/>
              <footer className="modal-card-foot">
                <button className="button is-success"
                        onClick={() => onOk() && this.handleClose(false)}>
                  确定
                </button>
                <button className="button"
                        onClick={() => OnCancel() && this.handleClose(false)}>
                  取消
                </button>
              </footer>
            </div>
          ) : (
            <div className="modal-content" {...otherProps}/>
          )
        }
        {mode !== 'card' && (
          <button className="modal-close is-large" aria-label="close"
                  onClick={this.handleClose}/>
        )}
      </div>
    )
  }
}

Modal.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.oneOf(['card']),
  title: PropTypes.string,
  defaultShow: PropTypes.bool,
  show: PropTypes.bool,
  onOk: PropTypes.func,
  onClose: PropTypes.func,
  OnCancel: PropTypes.func,
}
