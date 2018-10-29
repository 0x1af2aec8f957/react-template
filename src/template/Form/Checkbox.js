import React, { Component } from 'react'

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

  handelClick = () => {
    const {onChange} = this.props
    const {checkType} = this.state
    this.setState({checkType: !checkType},
      () => onChange && onChange(this.state.checkType))
  }

  render () {
    const {disabled/*bool*/, label/*str*/, color = 'info', className = '', children, ...otherProps} = this.props
    return (
      <div className={`
      checkbox
      has-text-${this.state.checkType ? color : 'grey'}
      ${className}
      `} onClick={!disabled && this.handelClick} {...otherProps}
      >
        <i className={`
        fas
        ${this.state.checkType ? 'fa-check-square' : 'fa-square'}
        `} style={{fontWeight: this.state.checkType ? 900 : 500}}/>
        <span className="has-text-black"
              style={{marginLeft: 3.5}}>{label || children}</span>
      </div>
    )
  }
}
