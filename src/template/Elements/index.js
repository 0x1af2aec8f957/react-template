import React, { Component } from 'react'
import Icon from '../Components/Icon'
import classNames from 'classnames'

export default class Elements extends Component {
  static Buttons ({className, align/*centered|right*/, addons, ...otherProps}) {
    return (
      <div className={
        classNames(
          'buttons',
          className,
          {
            'has-addons': addons,
            [`is-${align}`]: align,
          },
        )} {...otherProps}/>
    )
  }

  static Button ({type, className, outLine, fullWidth/*bool*/, disabled, invert, round, quiescent/*bool*/, status/*normal|hover|Focus|Active|Loading*/, size/*small|medium|large|normal*/, color/*white|light|dark|black|text|link|info|success|warning|danger|primary|*/, ...otherProps}) {
    return (
      <button className={
        classNames(
          'button',
          className,
          {
            [`is-${color}`]: color,
            [`is-${size}`]: size,
            [`is-${status === 'loading' ? 'loading' : `${status}ed`}`]: status,
            'is-outlined': outLine,
            'is-static': disabled || quiescent,
            'is-inverted': invert,
            'is-rounded': round,
          },
        )} type={type} disabled={disabled}
              style={{width: fullWidth ? '100%' : 'auto'}} {...otherProps}/>
    )
  }

  static Content ({className, size, ...otherProps}) {
    return (
      <div className={classNames('content', size && `is-${size}`, className)}
           {...otherProps}/>
    )
  }

  static Delete ({size, className, ...otherProps}) {
    return (
      <button className={classNames('delete', size && `is-${size}`, className)}
              {...otherProps}/>
    )
  }

  static Icon ({size = 'small'/*small|medium|large*/, color/*info|success|warning|danger*/, type, ...otherProps}) {
    return (
      <div className={
        classNames(
          'icon',
          {
            [`has-text-${color}`]: color,
            [`is-${size}`]: size,
          })}>
        <Icon type={type} {...otherProps}/>
      </div>
    )
  }

  static Image ({className, alt = '', round, size/*16x16|24x24|32x32|48x48|64x64|96x96|128x128|square|1by1|5by4|4by3|3by2|5by3|16by9|2by1|3by1|4by5|3by4|2by3|3by5|9by16|1by2|1by3*/, src, ...otherProps}) {
    return (
      <figure className={classNames('image', size && `is-${size}`)}
              {...otherProps}>
        <img className={classNames(round && 'is-rounded', className)}
             src={src || `https://bulma.io/images/placeholders/${size}.png`}
             alt={alt}/>
      </figure>
    )
  }

  static Progress ({className, color/*primary|link|info|success|warning|danger*/, size/*small|medium|large*/, value = 50}) {
    return (
      <progress className={
        classNames(
          'progress',
          className,
          {
            [`is-${color}`]: color,
            [`is-${size}`]: size,
          },
        )} value={value} max="100">{value}%</progress>
    )
  }

  static Table ({className, fields = [], data = [], footer/*ReactNode*/, caption/*ReactNode*/, border/*bool*/, strip, narrow, hover, fullWidth}) {
    return (
      <table className={
        classNames(
          'table',
          className,
          {
            'is-bordered': border,
            'is-striped': strip,
            'is-narrow': narrow,
            'is-hoverable': hover,
            'is-fullwidth': fullWidth,
          },
        )}>
        {caption && (<caption>{caption}</caption>)}
        <thead>
        <tr>
          {fields.map(({name, key, className = ''}, index) => (
            <th key={`table-thead-${key || name}-${index}`}
                className={className}>{name}</th>
          ))}
        </tr>
        </thead>
        {footer && (<tfoot>{footer}</tfoot>)}
        <tbody>
        {data.map((item/*{key,name,render}*/, index) => (
          <tr key={`table-body-${item.key || item.name}-${index}`}
              className={classNames(item.className)}>
            {fields.map((field/*{name, key}*/, reference) => (
              <td key={
                `table-field-${index}-${field.key || field.name}-${reference}`
              }>
                {field.render
                  ? field.render(item[field.key], item)
                  : item[field.key]}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    )
  }

  render () {
    const {className, ...otherProps} = this.props
    return (
      <div className={classNames('box', className)} {...otherProps}/>
    )
  }
}

export { default as Notification } from './Notification'
export { default as Tag } from './Tag'
export { default as Title } from './Title'
