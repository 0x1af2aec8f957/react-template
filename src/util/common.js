import React from 'react'

export const mergeProps = obj => (
  WrappedComponent => class extends React.Component {
    constructor (props) {
      super(props)
      this.state = obj
    }

    update = (obj_func) => { // add or modify
      return this.setState(
        typeof obj_func === 'function'
          ? obj_func()
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
      const props = {
        state: this.state, // record
        update: this.update,
        delete: this.delete,
        select: this.select,
      }
      return <WrappedComponent {...this.props} {...props}/>
    }
  }
)
