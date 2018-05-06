import 'polyfills'

import React from 'react'
import ReactDOM from 'react-dom'

import App from 'modules/app/containers/App'

const container = document.getElementById('container')

ReactDOM.render(<App />, container)

// Enables hot-module-reloading if it's enabled
if (module.hot) {
  module.hot.accept()
}
