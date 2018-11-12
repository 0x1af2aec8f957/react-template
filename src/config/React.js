import React from 'react'
import { createBrowserHistory /*createHashHistory */ } from 'history'
import $util from 'em-util' // 仅ES6
import * as $calc from 'js-calculation' // 兼容node
// import $api from 'js-transmission'
import axios from 'axios'
import { Cookies } from '../util/common'
/* export default class extends React.Component {
  static styles = styles
} */

const instance = axios.create({
  baseURL: '/project',
  // timeout: 1000,
})

instance.interceptors.response.use(function (/*response*/{data}) {
  // Do something with response data
  data.status === 401 && (window.location.href = '/login')
  return data || {}
}, function (error) {
  // Do something with response error
  alert(error)
})

instance.defaults.headers.common['token'] = Cookies.get('token')

Object.assign(React.Component.prototype, {
  $util,
  $calc,
  $api: instance,
  $router: createBrowserHistory(),
})

export default options => Object.assign(React.Component.prototype, options)