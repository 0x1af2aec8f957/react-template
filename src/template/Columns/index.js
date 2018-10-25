import React from 'react'

export function Row ({children, gapLess, multiLine, className = ''}) {
  const rowClassName = `columns 
    ${gapLess ? 'is-gapless' : ''} 
    ${multiLine ? 'is-multiline' : ''}
    ${className}`
  return (
    <div className={rowClassName} children={children}/>
  )
}

export function Col ({size = 6/*2-11*/, children, offset = 0/*2-11*/, className = ''}) {
  return (
    // As the grid can be divided into 12 columns
    <div className={`
  column
  ${size ? `is-${size}` : ''}
  is-offset-${offset}
  ${className}
  `} children={children}/>
  )
}