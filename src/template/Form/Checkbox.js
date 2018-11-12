import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Checkbox extends Component {
  constructor ({defaultChecked/*bool*/}) {
    super(arguments[0])
    this.state = {
      checkType: defaultChecked,
    }
  }

  componentWillReceiveProps ({checked/*bool*/}) {
    if (checked !== this.props.checked) {
      const {onChange} = this.props
      this.setState({checkType: checked})
      return onChange && onChange(checked)
    }
  }

  handleClick = () => {
    const {onChange} = this.props
    const {checkType} = this.state
    this.setState({checkType: !checkType},
      () => onChange && onChange(this.state.checkType))
  }

  render () {
    const {disabled/*bool*/, label/*str*/, color = 'info', className, children, ...otherProps} = this.props
    return (
      <div className={classNames('checkbox',
        `has-text-${this.state.checkType ? color : 'grey'}`, className)}
           onClick={!disabled && this.handleClick} {...otherProps}
      >
        <i className={classNames('fas',
          this.state.checkType ? 'fa-check-square' : 'fa-square')}
           style={{fontWeight: this.state.checkType ? 900 : 500}}/>
        <span className="has-text-black"
              style={{marginLeft: 3.5}}>{label || children}</span>
      </div>
    )
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.oneOf([
    'black',
    'dark',
    'light',
    'white',
    'primary',
    'link',
    'info',
    'success',
    'warning',
    'danger']),
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

Checkbox.defaultPropType = {
  color: 'info',
  defaultChecked: false,
}