import React from 'react'
import classNames from 'classnames'

export default function Icon ({className, type = 'font-awesome-flag', ...otherProps}) {
  return (
    // doc link -> https://fontawesome.com/icons
    <i className={classNames('fas', 'fab', className, `fa-${type}`)} {...otherProps}/>
  )
}