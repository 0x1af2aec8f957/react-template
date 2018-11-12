import React from 'react'
import Form, { Select } from '../../../template/Form'
import addresses from './addresses'

//*@remark: initValue = 北京市 北京市 东城区

export default class AddressSelect extends React.Component {
  constructor ({ defaultValue = {} }) {
    super(arguments[0])

    const provinceList = addresses.map(({name, ...other}) => ({label: name, value: name, ...other}))
    let provinceIndex = provinceList.findIndex(province => province === defaultValue.province)
    provinceIndex = provinceIndex <0 ? 0 : provinceIndex

    const cityList = provinceList[provinceIndex].city.map(({name, ...other}) => ({label: name, value: name, ...other}))
    let cityIndex = cityList.findIndex(city => city === defaultValue.city) || 0
    cityIndex = cityIndex <0 ? 0 : cityIndex

    const areaList = cityList[cityIndex].area.map(area => ({label: area, value: area}))
    let areaIndex = areaList.findIndex(area => area === defaultValue.area) || 0
    areaIndex = areaIndex <0 ? 0 : areaIndex

    this.state = {
      provinceList,
      cityList,
      areaList,
      province: provinceList[provinceIndex].name,
      city: provinceList[provinceIndex].city[cityIndex].name,
      area: provinceList[provinceIndex].city[cityIndex].area[areaIndex],
    }
  }

  handleProvinceChange = (event) => {
    const {onChange} = this.props
    const {provinceList} = this.state
    const {value} = event.target
    const resultList = provinceList.find(({value: _value}) => _value === value) || {city: []}
    const cityList = resultList.city.map(({name, ...other}) => ({label: name, value: name, ...other}))
    this.setState(
      {
        cityList,
        areaList: cityList[0].area.map(area => ({label: area, value: area})),
        province: value,
        city: cityList[0].value,
        area: cityList[0].area[0],
      }, onChange && onChange(
      {province: value, city: cityList[0].value, area: cityList[0].area[0]},
    ),
    )
  }

  handleCityChange = (event) => {
    const {onChange} = this.props
    const {cityList, province} = this.state
    const {value} = event.target
    const resultList = cityList.find(({value: _value}) => _value === value) || {area: []}
    const areaList = resultList.area.map(area => ({label: area, value: area}))
    this.setState(
      {
        areaList,
        city: value,
        area: areaList[0].value,
      }, onChange && onChange({province, city: value, area: areaList[0].value}),
    )
  }

  handleAreaChange = (event) => {
    const {onChange} = this.props
    const {province, city} = this.state
    const {value} = event.target
    this.setState(
      {province, city, area: value},
      onChange && onChange({province, city, area: value}),
    )
  }

  render () {
    return (
      <Form.Field.Control>
        <Select option={this.state.provinceList}
                onChange={this.handleProvinceChange}/>
        <Select option={this.state.cityList}
                onChange={this.handleCityChange}/>
        <Select option={this.state.areaList}
                onChange={this.handleAreaChange}/>
      </Form.Field.Control>
    )
  }
}