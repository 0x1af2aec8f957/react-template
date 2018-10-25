import React from 'react'

export default function Icon ({className = '', type = 'font-awesome-flag', ...otherProps}) {
  return (
    // doc link -> https://fontawesome.com/icons
    <i className={`
  fas
  fab
  ${type ? `fa-${type}` : ''}
  ${className}
  `} {...otherProps}/>
  )
}