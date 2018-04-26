import Route from './Route'
import CategoriesPage from '../../routes/categories/containers/CategoriesPage'
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
    id: CategoriesPage,
    path: '/(*)'
  })
]

export default createRouteConfig
