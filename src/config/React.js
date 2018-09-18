import React from 'react'
import { createBrowserHistory /*createHashHistory */ } from 'history'
import $util from 'em-util' // 仅ES6
import * as $calc from 'js-calculation' // 兼容node
import $api from 'js-transmission'
/* export default class extends React.Component {
  static styles = styles
} */

Object.assign(React.Component.prototype, {
  $util,
  $calc,
  $api,
  $router: createBrowserHistory(),
})

export default options => Object.assign(React.Component.prototype, options)