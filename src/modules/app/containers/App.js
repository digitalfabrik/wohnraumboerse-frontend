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
import { MuiThemeProvider } from '@material-ui/core'
import muiTheme from '../constants/muiTheme'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
// We need to import the german locales for moment: https://material-ui-pickers.firebaseapp.com/localization/moment
import 'moment/locale/de'
import moment from 'moment'

class App extends React.Component {
  store
  routeConfig

  constructor () {
    super()
    this.routeConfig = new RouteConfig(createRouteConfig())
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount () {
    this.store = createReduxStore(createHistory, {}, this.routeConfig)
  }

  render () {
    return <Provider store={this.store}>
      <EndpointProvider
        endpoints={[categoriesEndpoint, disclaimerEndpoint]}>
        <I18nProvider>
          <ThemeProvider theme={theme}>
            <MuiThemeProvider theme={muiTheme}>
              <MuiPickersUtilsProvider utils={MomentUtils} locale='de' moment={moment}>
                <RouterFragment routeConfig={this.routeConfig} />
              </MuiPickersUtilsProvider>
            </MuiThemeProvider>
          </ThemeProvider>
        </I18nProvider>
      </EndpointProvider>
    </Provider>
  }
}

export default App
