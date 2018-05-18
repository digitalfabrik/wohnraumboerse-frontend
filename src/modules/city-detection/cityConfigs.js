import CityConfig from './CityConfig'

import logoNeuburg from './assets/neuburg-project.svg'
import logoBayreuth from './assets/bayreuth.png'

const configs = [
  new CityConfig('neuburgschrobenhausenwohnraum', 'neuburg.wohnen.integreat-app.de', true, 'Neuburg-Schrobenhausen', logoNeuburg),
  new CityConfig('bayreuthwohnraum', 'bayreuth.wohnen.integreat-app.de', false, 'Bayreuth', logoBayreuth)
]

export default configs
