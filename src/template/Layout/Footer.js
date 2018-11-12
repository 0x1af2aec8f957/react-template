import React from 'react'
import classNames from 'classnames'

export default function Footer ({className, ...otherProps}) {
  return (
    <footer className={classNames('footer', className)} {...otherProps}/>
  )
}