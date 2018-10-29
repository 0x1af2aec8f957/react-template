import React, { Component } from 'react'

const DEFAULT_COLOR = 'info' // 默认选中的颜色
const WRAPPED_LAYOUTS = ['horizontal'] // 需要Form自动处理的布局项

class Field extends Component {

  static Label ({className = '', size/*small|normal|medium|large*/, ...otherProps}) {
    return (
      <label className={`
        label
        ${size ? `is-${size}` : ''}
        ${className}
        `} {...otherProps}/>
    )
  }

  static Body ({className = '', ...otherProps}) {
    return (
      <div className={`field-body ${className}`} {...otherProps}/>)
  }

  static Control ({className = '', expand, multiLine, align/*right|centered*/, ...otherProps}) {
    return (
      <div className={`
      control
      ${className}
      ${multiLine ? 'is-grouped-multiline' : ''}
      ${expand ? 'is-expanded' : ''}
      ${align ? `is-grouped-${align}` : ''}
      `} {...otherProps}/>
    )
  }

  constructor ({initialValue = ''}) {
    super(arguments[0])
    this.state = {
      value: initialValue,
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
    const {className = '', layout/*horizontal*/, group, children, addons/*bool*/, narrow/*bool*/, ...fieldProps} = this.props

    const son = React.Children.map(children, function ({type, props}) {
      const {size, ...otherProps} = props
      return type === Field.Label && WRAPPED_LAYOUTS.includes(layout) ? (
        <div className={`field-label ${size ? `is-${size}` : ''}`}
             children={React.cloneElement(arguments[0], {...otherProps})}/>
      ) : arguments[0]
    })

    return (
      <div className={`
      field
      ${group ? 'is-grouped' : ''}
      ${addons ? 'has-addons' : ''}
      ${narrow ? 'is-narrow' : ''}
      ${layout ? `is-${layout}` : ''}
      ${className}
      `} children={son} {...fieldProps}/>
    )
  }
}

export default class Form extends Component {

  static Field = Field

  render () {
    const {onSubmit, layout: layouts, children, ...otherProps} = this.props

    const son = React.Children.map(children, function (/*child*/{type, props}) {
      const {layout} = props
      return type === Field
        ? React.cloneElement(arguments[0], {
          layout: layout || layouts,
        })
        : arguments[0]
    })

    const formProps = {
      onSubmit: (event) => {
        event.preventDefault()
        onSubmit && onSubmit(event)
      },
      children: son,
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