import disclaimerEndpoint from '../endpoints/disclaimer'
import livingEndpoint from '../endpoints/living'

/**
 * Contains all reducers from all endpoints which are defined in {@link './endpoints/'}
 */
const endpoints = [
  livingEndpoint,
  disclaimerEndpoint
]
const reducers = endpoints.reduce((result, endpoint) => {
  result[endpoint.stateName] = endpoint.createReducer()
  return result
}, {})

export default reducers
