import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Media } from '../../../template/Layout'
import Elements from '../../../template/Elements'

export default class Alert extends React.Component {

  state = {
    visible: true,
  }

  handleClose = () => {
    this.setState({visible: false})
    this.props.onClose()
  }

  render () {
    const {children, size/*mall|medium|large*/, status/*success|info|danger|warning*/, className, onClose} = this.props
    const color = status === 'error' ? 'danger' : status
    let wrapStyle = {
      marginBottom: '1.5rem',
      padding: '0.5rem 0.8rem',
    }
    let type = 'check-circle'

    switch (status) {
      case 'success':
        type = 'check-circle'
        wrapStyle.backgroundColor = '#f6ffed'
        wrapStyle.border = '1px solid #b7eb8f'
        break
      case 'info':
        type = 'info-circle'
        wrapStyle.backgroundColor = '#e6f7ff'
        wrapStyle.border = '1px solid #91d5ff'
        break
      case 'warning':
        type = 'exclamation-triangle'
        wrapStyle.backgroundColor = '#fffbe6'
        wrapStyle.border = '1px solid #ffe58f'
        break
      default:
        type = 'times-octagon'
        wrapStyle.backgroundColor = '#fff1f0'
        wrapStyle.border = '1px solid #ffa39e'
        break
    }

    return (
      this.state.visible ? <Media style={wrapStyle}>
        <Media.Left>
          <Elements.Icon size={size}
                         type={type}
                         color={color}/>
        </Media.Left>
        <Media.Content className={classNames(className)} children={children}/>
        {onClose && (
          <Media.Right>
            <Elements.Icon size="small"
                           type="times"
                           className="is-cursor-pointer"
                           onClick={this.handleClose}/>
          </Media.Right>
        )}
      </Media> : null
    )
  }
}

Alert.propTypes = {
  size: PropTypes.oneOf(['mall', 'medium', 'large']),
  status: PropTypes.oneOf(['success', 'info', 'error', 'warning']).isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
}

Alert.defaultProps = {
  status: 'success',
}
