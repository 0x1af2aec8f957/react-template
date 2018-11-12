import React from 'react'
import classNames from 'classnames'

export default function Select ({className, value, defaultValue, disabled, children, option, multiple, size, color, round, status, ...otherProps}) {
  return (
    <div className={
      classNames(
        'select',
        className,
        {
          'is-multiple': multiple,
          [`is-${color}`]: color,
          'is-rounded': round,
          [`is-${size}`]: size,
          [`is-${status}`]: status,
        })
    }>
      <select multiple={multiple}
              disabled={disabled}
              defaultValue={defaultValue}
              value={value}
              {...otherProps}>
        {children || option.map(({value, label, key}, index) => (
          <option value={value}
                  key={`select-option-${key ? `${key}-${index}` : index}`}
          >{label}</option>
        ))}
      </select>
    </div>
  )
}