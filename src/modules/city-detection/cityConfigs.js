import CityConfig from './CityConfig'
import environment from 'environment.config'

const cityConfigs = fetch(`${environment.apiBaseUrl}city-configs/`, {mode: 'cors'})
  .then(response => {
    response.json().then(data => {
      return data.map(config => new CityConfig(config))
    })
  })

export default cityConfigs
