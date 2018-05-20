const DEV_ENVIRONMENT = {
  apiBaseUrl: 'http://localhost:8080/v0/'
}

const PROD_ENVIRONMENT = {
  apiBaseUrl: 'http://api.wohnen.integreat-app.de/v0/'
}

const browserEnvironment = localStorage.getItem('environment')

let environment

if (browserEnvironment) {
  environment = browserEnvironment
  // eslint-disable-next-line
} else if (__DEV__) {
  environment = DEV_ENVIRONMENT
  // eslint-disable-next-line
} else {
  // eslint-disable-next-line
  environment = PROD_ENVIRONMENT
}

export default environment
