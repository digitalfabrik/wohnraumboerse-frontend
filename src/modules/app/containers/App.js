import React from 'react'
import { Provider } from 'react-redux'
import createReduxStore from '../createReduxStore'
import createHistory from '../createHistory'
import EndpointProvider from '../../endpoint/EndpointProvider'
import disclaimerEndpoint from '../../endpoint/endpoints/disclaimer'
import livingEndpoint from '../../endpoint/endpoints/living'
import RouteConfig from '../RouteConfig'
import RouterFragment from './RouterFragment'
import { ThemeProvider } from 'styled-components'
import createRouteConfig from '../createRouteConfig'
import theme from '../constants/theme'
import I18nProvider from './I18nProvider'

class App extends React.Component {
  store
  routeConfig

  constructor () {
    super()
    this.routeConfig = new RouteConfig(createRouteConfig())
  }

  componentWillMount () {
    this.store = createReduxStore(createHistory, {}, this.routeConfig)
  }

  render () {
    return <Provider store={this.store}>
      <EndpointProvider
        endpoints={[livingEndpoint, disclaimerEndpoint]}>
        <I18nProvider>
          <ThemeProvider theme={theme}>
            <RouterFragment routeConfig={this.routeConfig} />
          </ThemeProvider>
        </I18nProvider>
      </EndpointProvider>
    </Provider>
  }
}

export default App
