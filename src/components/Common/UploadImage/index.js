import React from 'react'
import { Card } from '../../../template/Components'
import Elements from '../../../template/Elements'

export default class UploadImage extends React.Component {
  constructor ({src = ''}) {
    super(arguments[0])
    this.state = {src}
  }

  componentWillReceiveProps ({src}) {
    if (this.props.src !== src) this.setState({src})
  }

  handleChange = (event) => {
    const {onChange} = this.props
    const {value, files} = event.target
    const src = /msie/.test(navigator.userAgent.toLowerCase())
      ? value
      : window.URL.createObjectURL(files[0])
    this.setState({src})
    onChange && onChange(files[0])
    event.stopPropagation()
  }

  render () {
    const {alt = 'cover', src, size = 'square'/*16x16|24x24|32x32|48x48|64x64|96x96|128x128|square|1by1|5by4|4by3|3by2|5by3|16by9|2by1|3by1|4by5|3by4|2by3|3by5|9by16|1by2|1by3*/, color/*white|light|dark|black|text|link|info|success|warning|danger|primary|*/, label = '上传图片', ...otherProps} = this.props
    // accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" 可以解决浏览器响应很慢的情况，减少验证的次数
    return (
      <Card {...otherProps}>
        <Card.Image alt={alt} size={size} src={this.state.src}/>
        <Card.Footer>
          <Card.Footer.Item>
            <label className="file-label">
              <Elements.Button
                outLine
                color={color}>
                <input className="file-input"
                       type="file"
                       onChange={this.handleChange}
                       accept="image/*"/>
                {label}
              </Elements.Button>
            </label>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    )
  }
}