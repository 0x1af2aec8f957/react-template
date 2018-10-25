import React, { Component } from 'react'

const DEFAULT_COLOR = 'info'

class Field extends Component {

  static Label ({className = '', ...otherProps}) {
    return (
      <div className="field-label is-normal">
        <label className={`label ${otherProps}`} {...otherProps}/>
      </div>
    )
  }

  static Value ({className = '', ...otherProps}) {
    return (
      <div className={`field-body ${className}`} {...otherProps}/>)
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.initialValue || '',
      color: DEFAULT_COLOR,
    }
  }

  handelChange = (value) => {
    const {onChange} = this.props
    this.setState({value, color: DEFAULT_COLOR})
    onChange && onChange(value)
    // console.log(this.refs.saveInput)
  }

  handelBlur = () => {
    const {rules = /[\S\s]/} = this.props
    this.setState(
      {color: rules.test(this.state.value) ? 'success' : 'danger'})
  }

  render () {
    const {className = '', layout/*horizontal*/, ...fieldProps} = this.props
    return (
      <div className={`
      field
      ${layout ? `is-${layout}` : ''}
      ${className}
      `} {...fieldProps}/>
    )
  }
}

export default class Form extends Component {

  static Field = Field

  render () {
    const {onSubmit, ...otherProps} = this.props
    const formProps = {
      onSubmit: (event) => {
        event.preventDefault()
        onSubmit && onSubmit(event)
      },
      ...otherProps,
    }

    return (
      <form {...formProps}/>
    )
  }
}

export { default as Checkbox } from './Checkbox'
export { default as Input } from './Input'
export { default as Radio } from './Radio'
export { default as UploadFile } from './UploadFile'