import React, { Component } from 'react'
import {
  BrowserRouter /* HashRouter */ as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom'
import Layout, { Level } from '../template/Layout'
import Elements, { Title } from '../template/Elements'
import { Home, About } from '../components'
import logo from '../assets/images/logo.svg'

// TODO:Example

const NoMatch = ({match, history}) => (
  <Layout.Content className="is-block">
    <Layout.Container>
      <Title.SubTitle>No match for <code className="has-text-danger">{match.path}</code></Title.SubTitle>
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

function LayoutComponent ({RouterView}) {
  return (<Layout size="fullheight">
    <Layout.Header>
      <Level>
        <Level.Item>
          <Elements.Image className="animated rotateOut infinite" src={logo} alt="logo" style={{width: 150}}/>
          <Title>hello react app</Title>
        </Level.Item>
      </Level>
    </Layout.Header>
    <RouterView/>
    <Layout.Footer>
      <Layout.Container>
        <Elements.Content>
          <blockquote>Go to <a href="https://github.com/noteScript/react-template">React-template</a> to see a detailed description of the problem.</blockquote>
        </Elements.Content>
      </Layout.Container>
    </Layout.Footer>
  </Layout>)
}

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = (route) => (<Route
  path={route.path}
  render={props => (
    // pass the sub-routes down to keep nesting
    <route.component {...props} RouterView={() => (
      route.routes ? (<Switch>
        {route.routes.map((route, index) => (<RouteWithSubRoutes {...route} key={`routerView-${index}`}/>))}
        <Route component={NoMatch}/>
      </Switch>) : null
    )}/>
  )}
/>)

const routes = [
  {
    path: '/',
    component: LayoutComponent,
    routes: [
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/about',
        component: About,
      },
    ],
  }]

export default class Routes extends Component {
  render () {
    const {basename = '/'} = this.props
    return (
      <Router basename={basename}>
        {/*React.Children.only expected to receive a single React element child*/}
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={`routeWithSubRoutes-${index}`} {...route} />
          ))}
        </Switch>
      </Router>
    )
  }
}
