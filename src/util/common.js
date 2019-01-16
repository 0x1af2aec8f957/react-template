import React from 'react'

export const mergeProps = obj => ( // mapObjectToProps
  WrappedComponent => class extends React.Component {
    state = obj

    call = async (func) => { // Execute asynchronous function
      return await func()
    }

    update = (obj_func) => { // add or modify
      const state = this.state
      const call = this.call
      return this.setState(
        typeof obj_func === 'function'
          ? obj_func({state, call})
          : obj_func,
      )
    }

    delete = (key) => { // remove
      return this.setState({[key]: undefined})
    }

    select = (str_func) => { // fetch
      return str_func === 'function'
        ? str_func(this.state)
        : this.state[str_func]
    }

    render () {
      const wrappedProps = {
        state: this.state, // record
        update: this.update,
        delete: this.delete,
        select: this.select,
      }
      return <WrappedComponent {...this.props} {...wrappedProps}/>
    }
  }
)

export const asyncComponent = ( // () => import('Component') <-代码分割&异步加载react组件

  /**推荐升级react版本至v16.6，
    *使用import React, { lazy, Suspense } from 'react'的方式实现需求，
    *请参考：https://juejin.im/post/5c399394e51d4552411ac8a9
   **/

  importComponent => class AsyncComponent extends React.Component {
    state = {
      component: null,
    }

    async componentDidMount () {
      const {default: Component} = await importComponent()
      this.setState({
        component: <Component {...this.props}/>,
      })
    }

    render () {
      return this.state.component
    }
  })

export { default as Cookies } from 'cookies-js' // https://github.com/ScottHamper/Cookies
export { default as Joi } from 'joi-browser' // https://github.com/hapijs/joi
export { default as queryString }  from 'querystring' // https://nodejs.org/api/querystring.html
export { default as psl } from 'psl' // https://github.com/wrangr/psl
