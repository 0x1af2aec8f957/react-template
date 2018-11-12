import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default function Icon ({className, type, ...otherProps}) {
  return (
    // doc link -> https://fontawesome.com/icons
    <i className={classNames('fas', 'fab', className, `fa-${type}`)} {...otherProps}/>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
}

Icon.defaultProps = {
  type: 'font-awesome-flag',
}