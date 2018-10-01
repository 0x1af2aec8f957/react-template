import React, { Component } from 'react'
import {
  BrowserRouter /* HashRouter */ as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom'
import { Home, About } from '../components'

// TODO:Example

const NoMatch = ({match, history}) => (
  <div style={{padding: '3rem 1rem'}}>
    <h3 className="has-text-centered" style={{marginBottom: '3rem'}}>
      No match for <code>{match.path}</code>
    </h3>
    <div className="has-text-left has-text-grey is-text">
      <p style={{marginBottom: '1.8rem'}}>
        <span className="padding-half-right">Operation</span>-
        <span className="padding-half-left has-text-link"
              onClick={history.goBack}>Go Back</span>.
      </p>
      {
        Object.entries(match).map(([key, value], index) => (
          <p key={`json.string-${index}`} className="has-background-light"
             style={{marginTop: '0.6rem'}}>
            <span className="has-text-danger no-select">{index + 1}-</span>
            <span
              className="has-text-success padding-half-left padding-half-right">{key}</span>:
            <span className="has-text-info padding-half-left">{JSON.stringify(value)}</span>
          </p>
        ))
      }
    </div>
    <p style={{marginTop: '1.8rem'}}>Go to <a
      href="https://github.com/noteScript/react-template">React-template</a> to
      see a detailed description of the problem.
    </p>
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
