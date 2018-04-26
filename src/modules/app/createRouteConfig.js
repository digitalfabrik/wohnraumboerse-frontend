import Route from './Route'
import LivingPage from '../../routes/living/containers/LivingPage'
import LivingFormPage from '../../routes/living-form/containers/LivingFormPage'

const createRouteConfig = () => [
  new Route({
    id: LivingFormPage,
    path: '/form'
  }),
  new Route({
    path: '/offer/:token/:action'
  }),
  new Route({
    id: LivingPage,
    path: '/(*)'
  })
]

export default createRouteConfig
