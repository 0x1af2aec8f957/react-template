import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Menu extends Component {

  static Item ({className, active, ...otherProps}) {
    return (
      <div className={classNames('dropdown-item', active && 'is-active',
        className)}
           {...otherProps}/>
    )
  }

  static Divider () {return (<hr className="dropdown-divider"/>)}

  render () {
    const {className, ...otherProps} = this.props
    return (
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className={classNames('dropdown-content',
          className)} {...otherProps}/>
      </div>
    )
  }
}

export default class DropDown extends Component {

  static Button ({className, children, direction /*up|down*/, ...otherProps}) {
    return (
      <div className="dropdown-trigger">
        <button className={classNames('button', className)}
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                {...otherProps}>
          {children}
          <span className="icon is-small">
        <i className={classNames('fas', `fa-angle-${direction}`)}
           aria-hidden="true"/>
      </span>
        </button>
      </div>
    )
  }

  static Menu = Menu

  render () {
    const {className, active/*bool*/, hover/*bool*/, align/*right*/, direction/*up*/, ...otherProps} = this.props

    return (
      <div className={
        classNames(
          'dropdown',
          className,
          {
            'is-active': active,
            'is-hoverable': hover,
            [`is-${align}`]: align,
            [`is-${direction}`]: direction,
          },
        )} {...otherProps}/>
    )
  }
}

Menu.propTypes = {
  className: PropTypes.string,
}

DropDown.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  hover: PropTypes.bool,
  align: PropTypes.oneOf(['right']),
  direction: PropTypes.oneOf(['up']),

}

DropDown.Button.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf(['up', 'down']),

}

Menu.Item.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
}

DropDown.Button.defaultProps = {
  direction: 'down',
}