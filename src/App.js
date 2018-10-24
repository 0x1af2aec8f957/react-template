import React, { Component } from 'react'
// import 'qc-ui'
import 'bulma/css/bulma.css'
import ReactConfig from './config/React'
import Router from './config/Router'
import './assets/style/global.css'
import logo from './assets/images/logo.svg'
import Title from './template/Elements/Title'
import Elements from './template/Elements'

ReactConfig({ // TODO: Extended React.Component this
  msg: 'hello react app',
})

// 在你没有使用对应的生命周期钩子的情况下，请你删除对应的钩子！
class App extends Component {

  componentWillMount () { // 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state

  }

  render () { // 组件渲染
    return <Router>
      <Elements.Image className="animated rotateOut infinite" src={logo} alt="logo" style={{width: 150}}/>
      <Title>{this.msg}</Title>
    </Router>
  }

  componentDidMount () { // 组件渲染之后调用，只调用一次

  }

  componentWillReceiveProps (nextProps) { // 组件初始化时不调用，组件接受新的props时调用

  }

  shouldComponentUpdate (nextProps, nextState) { // react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候

  }

  componentWillUpdata (nextProps, nextState) { // 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

  }

  componentDidUpdate () { // 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点

  }

  componentWillUnmount () { // 组件将要卸载时调用，一些事件监听和定时器需要在此时清除

  }
}

export default App