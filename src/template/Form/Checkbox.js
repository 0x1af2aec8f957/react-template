import React, { Component } from 'react'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      checkType: !!props.defaultChecked,
    }
  }

  handelClick = () => {
    const {onChange} = this.props
    const {checkType} = this.state
    this.setState({checkType: !checkType},
      () => onChange && onChange(this.state.checkType))
  }

  render () {
    const {disabled, label, color = 'info', className} = this.props
    return (
      <div className={`
      is-inline
      has-text-${this.state.checkType ? color : 'grey'}
      ${className}
      `} onClick={!disabled && this.handelClick}
      >
        <i className="fas check-square"/>
        <span className="has-text-black">{label}</span>
      </div>
    )
  }
}
