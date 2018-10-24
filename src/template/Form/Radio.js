import React, { Component } from 'react'

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: props.value,
    }
  }

  handelClick = (value) => {
    const {onChange} = this.props
    this.setState({value}, () => onChange && onChange(value))
  }

  render () {
    const {data/*array*/, color = 'info', className: classNames = ''} = this.props
    return (
      <div className={`control is-inline ${classNames}`}>
        {
          data.map(({label, value, disabled, className = ''}, index) => (
            <div className={`
                is-inline
                has-text-${this.state.value === value ? color : 'grey'}
                ${className}
                `}
                 style={{marginLeft: index ? '0.5em' : 0}}
                 onClick={() => !disabled && this.handelClick(value)}
                 key={`radio-${index}`}
            >
              <i className="fas dot-circle"/>
              <span className="has-text-black">{label}</span>
            </div>
          ))
        }
      </div>
    )
  }
}
