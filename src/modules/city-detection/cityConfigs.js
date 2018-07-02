import CityConfig from './CityConfig'

import logoNeuburg from './assets/neuburg_logo.svg'
import logoBayreuth from './assets/bayreuth_logo.png'
import faviconBayreuth from './assets/bayreuth_favicon.ico'
import faviconNeuburg from './assets/neuburg_favicon.ico'

const configs = [
  new CityConfig('neuburgschrobenhausenwohnraum', 'raumfrei.neuburg-schrobenhausen.de', true, 'Neuburg-Schrobenhausen', logoNeuburg, faviconNeuburg),
  new CityConfig('bayreuthwohnraum', 'bayreuth.wohnen.integreat-app.de', false, 'Bayreuth', logoBayreuth, faviconBayreuth)
]

export default configs
