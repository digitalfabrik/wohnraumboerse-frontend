import disclaimerEndpoint from '../endpoints/disclaimer'
import categoriesEndpoint from '../endpoints/categories'

/**
 * Contains all reducers from all endpoints which are defined in {@link './endpoints/'}
 */
const endpoints = [
  categoriesEndpoint,
  disclaimerEndpoint
]
const reducers = endpoints.reduce((result, endpoint) => {
  result[endpoint.stateName] = endpoint.createReducer()
  return result
}, {})

export default reducers
