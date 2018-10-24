import React, { Component } from 'react'

export default class extends Component {

  constructor (props) {
    super(props)
    const {total, pageSize, current} = props
    this.state = {
      total,
      pageSize,
      current,
    }
  }

  render () {
    const {hideOnSinglePage = true, round/*bool*/, size/*small|medium|large*/, className = ''} = this.props
    return (
      (!hideOnSinglePage ||
        (this.state.total > this.state.pageSize)) &&
      (
        <nav className={`
        pagination
        ${round ? 'is-rounded' : ''}
        ${size ? `is-${size}` : ''}
        ${className}
        `} role="navigation" aria-label="pagination">
          <a className="pagination-previous"
             disabled={this.state.current <= 1}>上一页</a>
          <a className="pagination-next"
             disabled={this.state.current >= this.state.total}>下一页</a>
          <ul className="pagination-list">
            <li>
              <a className="pagination-link is-current" aria-label="Page 1"
                 aria-current="page">1</a>
            </li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li>
              <a className="pagination-link" aria-label="Goto page 2">2</a>
            </li>
            <li><span className="pagination-ellipsis">&hellip;</span></li>
            <li>
              <a className="pagination-link" aria-label="Goto page 3">3</a>
            </li>
          </ul>
        </nav>
      )
    )
  }
}