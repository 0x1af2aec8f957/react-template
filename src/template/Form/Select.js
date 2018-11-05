import React from 'react'

export default function Select ({className = '', value, defaultValue, disabled, children, option, multiple, size, color, round, status, ...otherProps}) {
  return (
    <div className={`
    select
    ${multiple ? 'is-multiple' : ''}
    ${color ? `is-${color}` : ''}
    ${round ? `is-rounded` : ''}
    ${round ? `is-${size}` : ''}
    ${status ? `is-${status}` : ''}
    ${className}
    `}>
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