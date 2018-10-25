import React, { Component } from 'react'

export default class Tab extends Component {

  static Item ({className = '', active, ...otherProps}) {
    return (
      <li
        className={`
        ${active ? 'is-active' : ''}
        ${className}
        `} {...otherProps}/>
    )
  }

  render () {
    const {align/*centered|right*/, size/*small|medium|large*/, mode/*boxed|toggle|*/, round/*bool*/, fullWidth/*bool*/, ...otherProps} = this.props
    return (
      <div className={`
      tabs
      ${align ? `is-${align}` : ''}
      ${size ? `is-${size}` : ''}
      ${mode ? `is-${mode}` : ''}
      ${round ? `is-toggle-rounded` : ''}
      ${fullWidth ? `is-fullwidth` : ''}
      `}>
        <ul {...otherProps}/>
      </div>
    )
  }
}