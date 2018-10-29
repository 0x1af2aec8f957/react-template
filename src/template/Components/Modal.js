import React, { Component } from 'react'

export default class Modal extends Component {

  constructor ({defaultShowState/*bool*/}) {
    super(arguments[0])
    this.state = {
      showState: defaultShowState,
    }
  }

  handelClose = (closeType = true) => {
    const {onClose} = this.props
    this.setState({
      showState: !this.state.showState,
    }, () => closeType && onClose && onClose())
  }

  render () {
    const {className = '', mode/*card*/, title, onOk, OnCancel, ...otherProps} = this.props
    return (
      this.state.showState && (
        <div className={`modal ${className}`}>
          <div className="modal-background" onClick={this.handelClose}/>
          {
            mode === 'card' ? (
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">{title}</p>
                  <button className="delete" aria-label="close"
                          onClick={this.handelClose}/>
                </header>
                <section className="modal-card-body" {...otherProps}/>
                <footer className="modal-card-foot">
                  <button className="button is-success"
                          onClick={() => onOk() && this.handelClose(false)}>
                    确定
                  </button>
                  <button className="button"
                          onClick={() => OnCancel() && this.handelClose(false)}>
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
                    onClick={this.handelClose}/>
          )}
        </div>
      ))
  }
}