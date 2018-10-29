import React, { Component } from 'react'

export default class Radio extends Component {

  constructor ({defaultValue}) {
    super(arguments[0])
    this.state = {
      value: defaultValue,
    }
  }

  componentWillReceiveProps ({value}) {
    if (value !== this.props.value) {
      const {onChange} = this.props
      this.setState({value})
      return onChange && onChange(value)
    }
  }

  handelClick = (value) => {
    const {onChange} = this.props
    this.setState({value}, () => onChange && onChange(value))
  }

  render () {
    const {data/*array*/, color = 'info', className: classNames = '', ...otherProps} = this.props
    return (
      <div className={`control is-inline ${classNames}`}>
        {
          data.map(({label, value, disabled, className = '', key}, index) => (
            <div className={`
                radio
                has-text-${this.state.value === value ? color : 'grey'}
                ${className}
                `}
                 style={{marginLeft: index ? '0.5em' : 0}}
                 onClick={() => !disabled && this.handelClick(value)}
                 key={`radio-${key || index}`}
                 {...otherProps}
            >
              <i className={`
              fas
              ${this.state.value === value ? 'fa-dot-circle' : 'fa-circle'}
              `} style={{fontWeight: this.state.value === value ? 900 : 500}}/>
              <span className="has-text-black"
                    style={{marginLeft: 3.5}}>{label}</span>
            </div>
          ))
        }
      </div>
    )
  }
}
