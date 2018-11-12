import React, { Component } from 'react'
import classNames from 'classnames'

const enterMethod = (event, method) => event.keyCode === 13 && method &&
  method(event.target.value)

function Field ({
                  prefix/*image icons*/,
                  suffix/*image icons*/,
                  addonafter/*ReactNode*/,
                  addonbefore/*ReactNode*/,
                  size,
                  expand,
                  color/*primary|info|success|warning|danger*/,
                  status/*normal|hover|focus|loading*/,
                  help,
                  children,
                  narrow = true/*bool*/,
                }) {
  const controlProps = {
    className: classNames(
      'control',
      {
        'is-loading': status === 'loading',
        [`is-${size}`]: size,
        'is-expanded': expand,
        'has-icons-left': prefix,
        'has-icons-right': suffix,
      },
    ),
  }

  return (
    <div className={classNames('field',
      {'has-addons': addonafter || addonbefore, 'is-narrow': narrow})}>
      {
        addonbefore && (
          <div className="control">
            {addonbefore}
          </div>
        )
      }
      <div {...controlProps}>
        {children}
        {
          prefix && (<div className="icon is-small is-left">
            <i className={`fas fab fa-${prefix}`}/>
          </div>)
        }
        {
          suffix && (<div className="icon is-small is-right">
            <i className={`fas fab fa-${suffix}`}/>
          </div>)
        }
        {
          help && (<p className={`help is-${color}`}>
            {help}
          </p>)
        }
      </div>
      {
        addonafter && (
          <div className="control">
            {addonafter}
          </div>
        )
      }
    </div>
  )
}

const getInputProps = (
  {round, status, size, color, disabled, placeholder = 'Please input contents', onChange, onPressEnter, id, type = 'text', readOnly, defaultValue, value, className, ...otherProps},
  tag = 'input') => ({
  className: classNames(tag, className, {
    'is-rounded': round,
    [`is-${status}ed`]: status && status !== 'loading',
    [`is-${size}`]: size,
    [`is-${color}`]: color,
  }),
  disabled,
  placeholder,
  onChange,
  onKeyDown: event => enterMethod(event, onPressEnter),
  id,
  type,
  readOnly,
  value,
  defaultValue,
  ...otherProps,
})

export default class Input extends Component {

  static TextArea (props) {
    return (
      <Field {...props}>
      <textarea {...getInputProps(props, 'textarea')}
                rows={props.rows/*height[Number]*/}/>
      </Field>
    )
  }

  static Select (props) {
    return (
      <Field {...props}>
        <div {...getInputProps(
          {...props, className: classNames(props.multiple && 'is-multiple')},
          'select')}>
          <select multiple={props.multiple}
                  {...getInputProps(props, 'select')}

          >
            {props.option.map(({label, value, key}, index) => (
              <option value={value}
                      key={`${`option-${value}-${index}-${key}`}`}>{label}</option>),
            )}
          </select>
        </div>
      </Field>
    )
  }

  static Search ({placeholder, defaultValue, value, onChange, onSearch, label, children, addons/*bool*/, color/*按钮颜色*/, expand, ...otherProps}) {
    let inputValue = ''

    function valueChange (event) {
      inputValue = event.target.value
      onChange && onChange(inputValue)
    }

    return (
      <div className={classNames('field', addons && 'has-addons',
        expand && 'is-grouped')}>
        <div className={classNames('control', expand && 'is-expanded')}>
          <input className="input" type="text"
                 placeholder={placeholder}
                 onKeyDown={event => enterMethod(event, onSearch)}
                 onChange={valueChange}
                 defaultValue={defaultValue}
                 value={value}
                 {...otherProps}/>
        </div>
        <div className="control">
          <button className={classNames('button', color && `is-${color}`)}
                  onClick={() => onSearch && onSearch(inputValue)}>
            {label || children}
          </button>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Field {...this.props}>
        <input {...getInputProps(this.props)}/>
      </Field>
    )
  }
}
