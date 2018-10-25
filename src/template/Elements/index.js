import React, { Component } from 'react'
import Icon from '../Components/Icon'

export default class Elements extends Component {
  static Buttons ({className = '', addons, ...otherProps}) {
    return (
      <div className={`
    buttons
    ${addons ? 'has-addons' : ''}
    ${className}`} {...otherProps}/>
    )
  }

  static Button ({type, className = '', outline, disabled, invert, round, status/*normal|hover|Focus|Active|Loading*/, size/*small|medium|large|normal*/, color/*white|light|dark|black|text|link|info|success|warning|danger|primary|*/, ...otherProps}) {
    return (
      <button className={`
    button
    ${color ? `is-${color}` : ''}
    ${size ? `is-${size}` : ''}
    ${status ? `is-${status}ed` : ''}
    ${outline ? 'is-outlined' : ''}
    ${disabled ? 'is-static' : ''}
    ${invert ? 'is-inverted' : ''}
    ${round ? 'is-rounded' : ''}
    ${className}
    `} type={type} disabled={disabled} {...otherProps}/>
    )
  }

  static Content ({className = '', size, ...otherProps}) {
    return (
      <div className={`
    content
    ${size ? `is-${size}` : ''}
    ${className}
    `} {...otherProps}/>
    )
  }

  static Delete ({size, className = '', ...otherProps}) {
    return (
      <button className={`
    delete
    ${size ? `is-${size}` : ''}
    ${className}
    `} {...otherProps}/>
    )
  }

  static Icon ({size/*small|medium|large*/, color/*info|success|warning|danger*/, type, ...otherProps}) {
    return (
      <div className={`
    icon
    ${color ? `has-text-${color}` : ''}
    ${size ? `is-${size}` : ''}
    `}>
        <Icon type={type} {...otherProps}/>
      </div>
    )
  }

  static Image ({className = '', alt = '', round, size/*16x16|24x24|32x32|48x48|64x64|96x96|128x128|square|1by1|5by4|4by3|3by2|5by3|16by9|2by1|3by1|4by5|3by4|2by3|3by5|9by16|1by2|1by3*/, src, ...otherProps}) {
    return (
      <figure className={`
    image
    ${size ? `is-${size} ` : ''}
    `} {...otherProps}>
        <img className={`${round ? 'is-rounded' : ''} ${className}`}
             src={src || `https://bulma.io/images/placeholders/${size}.png`}
             alt={alt}/>
      </figure>
    )
  }

  static Progress ({className = '', color/*primary|link|info|success|warning|danger*/, size/*small|medium|large*/, value = 50}) {
    return (
      <progress className={`
    progress
    ${color ? `is=${color}` : ''}
    ${size ? `is-${size}` : ''}
    ${className}
    `} value={value} max="100">{value}%</progress>
    )
  }

  static Table ({className = '', fields, data, border/*bool*/, strip, narrow, hover, fullWidth}) {
    return (
      <table className={`
    table
    ${border ? 'is-bordered' : ''}
    ${strip ? 'is-striped' : ''}
    ${narrow ? 'is-narrow' : ''}
    ${hover ? 'is-hoverable' : ''}
    ${fullWidth ? 'is-fullwidth' : ''}
    ${className}
    `}>
        <thead>
        <tr>
          {fields.map(({name, key, className = ''}, index) => (
            <th key={`table-thead-${key || name}-${index}`}
                className={className}>{name}</th>
          ))}
        </tr>
        </thead>
        {/* <tfoot>
      <tr>
        <th><abbr title="Position">Pos</abbr></th>
        <th>Team</th>
        <th><abbr title="Played">Pld</abbr></th>
        <th><abbr title="Won">W</abbr></th>
        <th><abbr title="Drawn">D</abbr></th>
        <th><abbr title="Lost">L</abbr></th>
        <th><abbr title="Goals for">GF</abbr></th>
        <th><abbr title="Goals against">GA</abbr></th>
        <th><abbr title="Goal difference">GD</abbr></th>
        <th><abbr title="Points">Pts</abbr></th>
        <th>Qualification or relegation</th>
      </tr>
      </tfoot> */}
        <tbody>
        {data.map((item/*{key,name,render}*/, index) => (
          <tr key={`table-body-${item.key || item.name}-${index}`}
              className={item.className || ''}>
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
    const {className = '', ...otherProps} = this.props
    return (
      <div className={`box ${className}`} {...otherProps}/>
    )
  }
}