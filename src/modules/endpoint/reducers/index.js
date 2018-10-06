import disclaimerEndpoint from '../endpoints/disclaimer'
import categoriesEndpoint from '../endpoints/categories'
import cityConfigsEndpoint from '../endpoints/cityConfigs'

/**
 * Contains all reducers from all endpoints which are defined in {@link './endpoints/'}
 */
const endpoints = [
  cityConfigsEndpoint,
  categoriesEndpoint,
  disclaimerEndpoint
]
const reducers = endpoints.reduce((result, endpoint) => {
  result[endpoint.stateName] = endpoint.createReducer()
  return result
}, {})

export default reducers
