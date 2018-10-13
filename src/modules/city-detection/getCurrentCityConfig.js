/**
 * Maybe we should move this to the backend, otherwise we send too much information about other cities (that don't
 * matter to the client) like all the logos.
 * @returns {CityConfig|undefined} the current cityConfig depending on the hostname (domain) the user client is on.
 */
function getCurrentCityConfig (cityConfigs) {
  const hostname = (window.localStorage && window.localStorage.getItem && window.localStorage.getItem('hostname')) ||
    location.hostname
  const cityConfig = cityConfigs.find(city => city.hostName === hostname)
  if (!cityConfig) {
    throw new Error(`Couldn't find a city configuration for hostname '${hostname}'.`)
  }
  return cityConfig
}

export default getCurrentCityConfig
