import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default function Footer ({className, ...otherProps}) {
  return (
    <footer className={classNames('footer', className)} {...otherProps}/>
  )
}

Footer.propTypes = {
  className: PropTypes.string,
}