import React, { Component } from 'react'
import {
  BrowserRouter /* HashRouter */ as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom'
import Layout from '../template/Layout'
import Level from '../template/Layout/Level'
import Elements from '../template/Elements'
import Title from '../template/Elements/Title'
import { Home, About } from '../components'

// TODO:Example

const NoMatch = ({match, history}) => (
  <Layout.Content className="is-block">
    <Layout.Container>
      <Title.Subtitle>
        No match for <code className="has-text-danger">{match.path}</code>
      </Title.Subtitle>
      <div className="has-text-grey is-text">
        <p>
          <span>Operation&nbsp;&nbsp;_</span>
          <Elements.Button invert color="danger" onClick={history.goBack}>Go Back</Elements.Button>
        </p>
        <strong className="has-text-grey">Relevant information:</strong>
        <pre>{JSON.stringify(match, null, 2)}</pre>
      </div>
    </Layout.Container>
  </Layout.Content>
)

export default class extends Component {
  render () {
    return (
      <Router basename="/">
        {/*React.Children.only expected to receive a single React element child*/}
        <Layout size="fullheight">
          <Layout.Header>
            <Level>
              <Level.Item>
                {this.props.children}
              </Level.Item>
            </Level>
          </Layout.Header>
          <Switch>
            <Route path="/home" exact component={Home}/>
            <Route path="/about" exact component={About}/>
            {/*match 404*/}
            <Route component={NoMatch}/>
          </Switch>
          <Layout.Footer>
            <Layout.Container>
              <Elements.Content>
                <blockquote>
                  Go to <a
                  href="https://github.com/noteScript/react-template">React-template</a> to
                  see a detailed description of the problem.
                </blockquote>
              </Elements.Content>
            </Layout.Container>
          </Layout.Footer>
        </Layout>
      </Router>
    )
  }
}
