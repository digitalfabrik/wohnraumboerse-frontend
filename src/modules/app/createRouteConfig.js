import Route from './Route'
import CategoriesPage from '../../routes/categories/containers/CategoriesPage'
import LivingFormPage from '../../routes/living-form/containers/LivingFormPage'
import DisclaimerPage from '../../routes/disclaimer/containers/DisclaimerPage'

const createRouteConfig = () => [
  new Route({
    id: LivingFormPage,
    path: '/form'
  }),
  new Route({
    path: '/offer/:token/:action'
  }),
  new Route({
    id: CategoriesPage,
    path: '/(*)'
  }),
  new Route({
    id: DisclaimerPage,
    path: '/disclaimer'
  })
]

export default createRouteConfig
