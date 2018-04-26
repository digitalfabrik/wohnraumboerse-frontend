import cityConfigs from './cityConfigs'

/**
 * Maybe we should move this to the backend, otherwise we send too much information about other cities (that don't matter
 * to the client) like all the logos.
 * @returns {CityConfig|undefined} the current cityConfig depending on the hostname (domain) the user client is on.
 */
function getCurrentCityConfig () {
  return cityConfigs.find(city => city.hostNames.includes(location.hostname))
}

export default getCurrentCityConfig
