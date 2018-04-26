import disclaimerEndpoint from '../endpoints/disclaimer'
import livingEndpoint from '../endpoints/living'
import locationEndpoint from '../endpoints/locations'

/**
 * Contains all reducers from all endpoints which are defined in {@link './endpoints/'}
 */
const endpoints = [
  livingEndpoint,
  disclaimerEndpoint,
  locationEndpoint
]
const reducers = endpoints.reduce((result, endpoint) => {
  result[endpoint.stateName] = endpoint.createReducer()
  return result
}, {})

export default reducers
