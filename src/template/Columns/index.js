import React from 'react'

export function Row ({children, gapLess, multiLine, border, color/*white|black|light|dark|white-bis|white-ter|grey-lighter|grey-light|grey|grey-dark|grey-darker|black-ter|black-bis|danger|warning|success|info|link|primary*/, className = ''}) {
  const rowClassName = `
    columns
    ${gapLess ? 'is-gapless' : ''}
    ${border ? 'is-bordered' : ''}
    ${multiLine ? 'is-multiline' : ''}
    ${color ? `has-background-${color}` : ''}
    ${className}
    `
  return (
    <div className={rowClassName} children={children}/>
  )
}

export function Col ({size/*2-11*/, children, border, offset/*2-11*/, color/*white|black|light|dark|white-bis|white-ter|grey-lighter|grey-light|grey|grey-dark|grey-darker|black-ter|black-bis|danger|warning|success|info|link|primary*/, className = ''}) {
  return (
    // As the grid can be divided into 12 columns
    <div className={`
  column
  ${size ? `is-${size}` : ''}
  ${border ? 'is-bordered' : ''}
  ${color ? `has-background-${color}` : ''}
  ${offset ? `is-offset-${offset}` : ''}
  ${className}
  `} children={children}/>
  )
}

export default null