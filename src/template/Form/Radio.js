import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Radio extends Component {

  constructor ({defaultValue = ''}) {
    super(arguments[0])
    this.state = {
      value: defaultValue,
    }
  }

  componentWillReceiveProps ({value}) {
    if (value !== this.props.value) {
      this.setState({value})
    }
  }

  handleClick = (value) => {
    const {onChange} = this.props
    this.setState({value}, () => onChange && onChange(value))
  }

  render () {
    const {data/*array*/, color = 'info', className: newClassName, ...otherProps} = this.props
    return (
      <div className={classNames('control', 'is-inline', newClassName)}>
        {
          data.map(({label, value, disabled, className, key}, index) => (
            <div className={classNames('radio',
              `has-text-${this.state.value === value ? color : 'grey'}`,
              className)}
                 onClick={() => !disabled && this.handleClick(value)}
                 key={`radio-${key || index}`}
                 {...otherProps}
            >
              <i className={classNames('fas',
                this.state.value === value ? 'fa-dot-circle' : 'fa-circle')}
                 style={{fontWeight: this.state.value === value ? 900 : 500}}/>
              <span className="has-text-black"
                    style={{marginLeft: 3.5}}>{label}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  color: PropTypes.string,
  data: PropTypes.array.isRequired,

}
Radio.defaultPropType = {
  color: 'info',
  defaultValue: '',
}