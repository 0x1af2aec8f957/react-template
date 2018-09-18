import React, { Component } from 'react'
import {
  BrowserRouter /* HashRouter */ as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom'
import { Home, About } from '../components'

// TODO:Example

const NoMatch = ({location}) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
)

export default class extends Component {
  render () {
    return (
      <Router basename="/">
        {/*React.Children.only expected to receive a single React element child*/}
        <div className="items-center justify-center flex-column">
          {this.props.children}
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/about" component={About}></Route>
            {/*match 404*/}
            <Route component={NoMatch || Home}/>
          </Switch>
        </div>
      </Router>
    )
  }
}