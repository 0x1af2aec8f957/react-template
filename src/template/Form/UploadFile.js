import React, { Component } from 'react'

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: props.name || '...',
    }
  }

  onchange = (event) => {
    const {onChange} = this.props
    const file = event.target.files[0]
    this.setState({name: file.name}, () => onChange && onChange(file))
  }

  render () {
    const {label = 'Choose a file…', size/*small|normal|medium|large*/, accept, color = 'info'} = this.props
    return (
      <div className="field">
        <div
          className={`file
          is-${color}
          has-name
          is-boxed
          ${size ? `is-${size}` : ''}`}>
          <label className="file-label">
            <input className="file-input" type="file" onChange={this.onchange}
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
