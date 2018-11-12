import React, { Component } from 'react'
import classNames from 'classnames'

export default class Tab extends Component {

  static Item ({className, active, ...otherProps}) {
    return (
      <li className={classNames(active && 'is-active', className)}
          {...otherProps}/>
    )
  }

  render () {
    const {align/*centered|right*/, size/*small|medium|large*/, mode/*boxed|toggle|*/, round/*bool*/, fullWidth/*bool*/, ...otherProps} = this.props
    return (
      <div className={
        classNames(
          'tabs',
          {
            [`is-${align}`]: align,
            [`is-${size}`]: size,
            [`is-${mode}`]: mode,
            'is-toggle-rounded': round,
            'is-fullwidth': fullWidth,
          },
        )}>
        <ul {...otherProps}/>
      </div>
    )
  }
}