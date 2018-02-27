import languagesEndpoint from '../endpoints/languages'
import locationEndpoint from '../endpoints/locations'
import categoriesEndpoint from '../endpoints/categories'
import eventsEndpoint from '../endpoints/events'
import disclaimerEndpoint from '../endpoints/disclaimer'
import livingEndpoint from '../endpoints/living'

/**
 * Contains all reducers from all endpoints which are defined in {@link './endpoints/'}
 */
const endpoints = [
  livingEndpoint,
  languagesEndpoint,
  locationEndpoint,
  categoriesEndpoint,
  disclaimerEndpoint,
  eventsEndpoint
]
const reducers = endpoints.reduce((result, endpoint) => {
  result[endpoint.stateName] = endpoint.createReducer()
  return result
}, {})

export default reducers
