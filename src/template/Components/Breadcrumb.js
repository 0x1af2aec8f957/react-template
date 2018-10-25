import React, { Component } from 'react'

export default class Breadcrumb extends Component {

  static Item ({active/*bool*/, className = '', ...otherProps}) {
    return (
      <li className={`${active ? 'is-active' : ''} ${className}`}
          {...otherProps}/>
    )
  }

  render () {
    const {align/*centered|right*/, separator/*arrow|bullet|dot|succeeds*/, size/*small|medium|large*/, ...otherProps} = this.props
    return (
      <nav className={`
      breadcrumb ${align ? `is-${align}` : ''}
      ${separator ? `has-${separator}-separator` : ''}
      ${size ? `is-${size}` : ''}
      `} aria-label="breadcrumbs">
        <ul {...otherProps}/>
      </nav>
    )
  }
}