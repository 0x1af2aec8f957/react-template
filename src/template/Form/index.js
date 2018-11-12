import React, { Component } from 'react'
import classNames from 'classnames'

const DEFAULT_COLOR = 'info' // 默认选中的颜色
const WRAPPED_LAYOUTS = ['horizontal'] // 需要Form自动处理的布局项

class Field extends Component {

  static Label ({className, required, size/*small|normal|medium|large*/, ...otherProps}) {
    return (
      <label className={
        classNames(
          'label',
          className,
          {
            [`is-${size}`]: size,
            'is-required': required,
          },
        )} {...otherProps}/>
    )
  }

  static Body ({className, ...otherProps}) {
    return (
      <div className={classNames('field-body', className)} {...otherProps}/>)
  }

  static Control ({className, expand, multiLine, align/*right|centered*/, ...otherProps}) {
    return (
      <div className={
        classNames(
          'control',
          className,
          {
            'is-grouped-multiline': multiLine,
            'is-expanded': expand,
            [`is-grouped-${align}`]: align,
          },
        )} {...otherProps}/>
    )
  }

  constructor ({initialValue = ''}) {
    super(arguments[0])
    this.state = {
      value: initialValue,
      color: DEFAULT_COLOR,
    }
  }

  handleChange = (value) => {
    const {onChange} = this.props
    this.setState({value, color: DEFAULT_COLOR})
    onChange && onChange(value)
    // console.log(this.refs.saveInput)
  }

  handleBlur = () => {
    const {rules = /[\S\s]/} = this.props
    this.setState(
      {color: rules.test(this.state.value) ? 'success' : 'danger'})
  }

  render () {
    const {className, layout/*horizontal*/, group, required, children, addons/*bool*/, narrow/*bool*/, ...fieldProps} = this.props

    const son = React.Children.map(children, function ({type, props}) {
      const {size, ...otherProps} = props
      return type === Field.Label && WRAPPED_LAYOUTS.includes(layout) ? (
        <div className={classNames('field-label', size && `is-${size}`)}
             children={React.cloneElement(arguments[0],
               {...otherProps, required})}/>
      ) : arguments[0]
    })

    return (
      <div className={
        classNames(
          'field',
          className,
          {
            'is-grouped': group,
            'has-addons': addons,
            'is-narrow': narrow,
            [`is-${layout}`]: layout,

          },
        )} children={son} {...fieldProps}/>
    )
  }
}

export default class Form extends Component {

  static Field = Field

  render () {
    const {onSubmit, layout: layouts/*horizontal*/, children, ...otherProps} = this.props

    const son = React.Children.map(children, function (/*child*/{type, props}) {
      return type === Field
        ? React.cloneElement(arguments[0], {
          layout: props.layout || layouts,
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
export { default as Select } from './Select'