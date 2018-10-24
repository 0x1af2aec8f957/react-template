import React from 'react'

export default ({className = '', type = 'font-awesome-flag', ...otherProps}) => (
  // doc link -> https://fontawesome.com/icons
  <i className={`
  fas
  fab
  ${type ? `fa-${type}` : ''}
  ${className}
  `} {...otherProps}/>
)