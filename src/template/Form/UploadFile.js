import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class UploadFile extends Component {

  constructor ({name = '...'}) {
    super(arguments[0])
    this.state = {
      name: name,
    }
  }

  handleChange = (event) => {
    const {onChange} = this.props
    const file = event.target.files[0]
    this.setState({name: file.name}, () => onChange && onChange(file))
    event.stopPropagation()
  }

  render () {
    const {label = 'Choose a file…', size/*small|normal|medium|large*/, accept, color = 'info'} = this.props
    return (
      <div className="field">
        <div
          className={classNames('file', `is-${color}`, 'has-name', 'is-boxed',
            size && `is-${size}`)}>
          <label className="file-label">
            <input className="file-input" type="file"
                   onChange={this.handleChange}
                   accept={accept}/>
            <div className="file-cta">
              <div className="file-icon">
                <i className="fas fa-cloud-upload-alt"/>
              </div>
              <p className="file-label">
                {label}
              </p>
            </div>
            <p className="file-name">
              {this.state.name}
            </p>
          </label>
        </div>
      </div>
    )
  }
}

UploadFile.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'medium', 'large']),
  accept: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
}

UploadFile.defaultPropType = {
  label: 'Choose a file…',
  color: 'info',
  name: '...',
}