import CityConfig from './CityConfig'

import logoNeuburg from './assets/neuburg.png'
import logoBayreuth from './assets/bayreuth.png'

const configs = [
  new CityConfig('neuburgschrobenhausenwohnraum', ['neuburg.wohnen.integreat-app.de'], true, 'Neuburg-Schrobenhausen', logoNeuburg, 'https://www.neuburg-schrobenhausen.de/Impressum.n10.html'),
  new CityConfig('bayreuthwohnraum', ['bayreuth.wohnen.integreat-app.de', 'localhost'], false, 'Bayreuth', logoBayreuth, 'https://www.bayreuth.de/impressum/')
]

export default configs
