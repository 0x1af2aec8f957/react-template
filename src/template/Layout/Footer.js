import React from 'react'

export default function Footer ({className = '', ...otherProps}) {
  return (
    <footer className={`footer ${className}`} {...otherProps}/>
  )
}