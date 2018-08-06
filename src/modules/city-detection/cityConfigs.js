import CityConfig from './CityConfig'

import faviconNeuburg from './assets/neuburg_favicon.ico'
import logoNeuburg from './assets/neuburg_logo.svg'
import faviconBayreuth from './assets/bayreuth_favicon.ico'
import logoBayreuth from './assets/bayreuth_logo.png'
import faviconTestumgebung from './assets/testumgebung_favicon.ico'
import logoTestumgebung from './assets/testumgebung_logo.png'

const configs = [
  new CityConfig('neuburgschrobenhausenwohnraum', 'raumfrei.neuburg-schrobenhausen.de', true, 'Neuburg-Schrobenhausen', logoNeuburg, faviconNeuburg),
  new CityConfig('testumgebungwohnraum', 'test.wohnen.integreat-app.de', true, 'Testumgebung', logoTestumgebung, faviconTestumgebung),
  new CityConfig('bayreuthwohnraum', 'wohnraumboerse.bayreuth.de', false, 'Bayreuth', logoBayreuth, faviconBayreuth)
]

export default configs
