import EndpointBuilder from '../EndpointBuilder'

import environment from '../../../environment.config'
import CityConfig from '../../city-detection/CityConfig'

export default new EndpointBuilder('cityConfigs')
  .withStateToUrlMapper(state => `${environment.apiBaseUrl}city-configs/`)
  .withMapper((json, state) => {
    const cityConfigs = json
      .map(cityConfigJson => {
        return new CityConfig(cityConfigJson)
      })

    return cityConfigs
  })
  .build()
