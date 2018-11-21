import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function PaginationList ({pageTotal, current, onChange}) {

  return (
    <ul className="pagination-list">
      {current > 1 && (<li>
        <button className="pagination-link" onClick={() => onChange(1)}>1
        </button>
      </li>)}
      {current > 4 && (<li>
        <button className="pagination-ellipsis"
                onClick={() => onChange(current - 4)}>&hellip;</button>
      </li>)}
      {current > 3 && (<li>
        <button className="pagination-link"
                onClick={() => onChange(current - 2)}>{current - 2}</button>
      </li>)}
      {current > 2 && (<li>
        <button className="pagination-link"
                onClick={() => onChange(current - 1)}>{current - 1}</button>
      </li>)}
      <li>
        <button className="pagination-link is-current"
                disabled>{current}</button>
      </li>
      {current < pageTotal - 1 && (<li>
        <button className="pagination-link"
                onClick={() => onChange(current + 1)}>{current + 1}</button>
      </li>)}
      {current < pageTotal - 2 && (<li>
        <button className="pagination-link"
                onClick={() => onChange(current + 2)}>{current + 2}</button>
      </li>)}
      {current < pageTotal - 3 && (<li>
        <button className="pagination-ellipsis"
                onClick={() => onChange(current + 4)}>&hellip;</button>
      </li>)}
      {current < pageTotal && (<li>
        <button className="pagination-link"
                onClick={() => onChange(pageTotal)}>{pageTotal}</button>
      </li>)}
    </ul>
  )
}

export default class Pagination extends Component {

  constructor ({total = 1, defaultPageSize: pageSize = 1, defaultCurrent: current = 1}) {
    super(arguments[0])
    this.state = {
      total,
      pageSize,
      current,
    }
  }

  componentWillReceiveProps ({pageSize, total, current}) {
    pageSize !== this.props.pageSize && this.setState({pageSize})
    total !== this.props.total && this.setState({total})
    current !== this.props.current && this.setState({current})
  }

  handleChange = (pageCurrent) => {
    const {onChange} = this.props
    this.setState({current: pageCurrent})
    onChange && onChange(pageCurrent)
  }

  render () {
    const {hideOnSinglePage = true, round/*bool*/, size/*small|medium|large*/, align/*centered|right*/, className} = this.props
    const {total, pageSize, current} = this.state
    const pageTotal = Math.ceil(total / pageSize)
    return (
      (!hideOnSinglePage || (total > pageSize)) ? (
        <div className={
          classNames(
            'pagination',
            className,
            {
              'is-rounded': round,
              [`is-${size}`]: size,
              [`is-${align}`]: align,

            },
          )} role="navigation" aria-label="pagination">
          <button className="pagination-previous"
                  disabled={current <= 1}
                  onClick={() => this.handleChange(current - 1)}>Previous
          </button>
          <button className="pagination-next"
                  disabled={current >= pageTotal}
                  onClick={() => this.handleChange(current + 1)}>Next
          </button>
          <PaginationList current={current}
                          pageTotal={pageTotal}
                          onChange={this.handleChange}/>
        </div>
      ) : null
    )
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  hideOnSinglePage: PropTypes.bool,
  round: PropTypes.bool,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  current: PropTypes.number,
  defaultCurrent: PropTypes.number,
  defaultPageSize: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  align: PropTypes.oneOf(['right', 'centered']),
}

Pagination.defaultProps = {
  hideOnSinglePage: true,
  defaultPageSize: 1,
  defaultCurrent: 1,
}
