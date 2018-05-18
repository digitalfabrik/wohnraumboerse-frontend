import React from 'react'
import { Provider } from 'react-redux'
import createReduxStore from '../createReduxStore'
import createHistory from '../createHistory'
import EndpointProvider from '../../endpoint/EndpointProvider'
import disclaimerEndpoint from '../../endpoint/endpoints/disclaimer'
import categoriesEndpoint from '../../endpoint/endpoints/categories'
import RouteConfig from '../RouteConfig'
import RouterFragment from './RouterFragment'
import { ThemeProvider } from 'styled-components'
import createRouteConfig from '../createRouteConfig'
import theme from '../constants/theme'
import I18nProvider from './I18nProvider'
import { MuiThemeProvider } from 'material-ui'
import muiTheme from '../constants/muiTheme'

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
        endpoints={[categoriesEndpoint, disclaimerEndpoint]}>
        <I18nProvider>
          <ThemeProvider theme={theme}>
            <MuiThemeProvider theme={muiTheme}>
              <RouterFragment routeConfig={this.routeConfig} />
            </MuiThemeProvider>
          </ThemeProvider>
        </I18nProvider>
      </EndpointProvider>
    </Provider>
  }
}

export default App
