import Route from './Route'
import CategoriesPage from '../../routes/categories/containers/CategoriesPage'
import LivingFormPage from '../../routes/living-form/containers/LivingFormPage'
import DisclaimerPage from '../../routes/disclaimer/containers/DisclaimerPage'
import LivingManageOfferPage from '../../routes/living-manage-offer/containers/LivingManageOfferPage'

const createRouteConfig = () => [
  new Route({
    id: LivingFormPage,
    path: '/form'
  }),
  new Route({
    id: LivingManageOfferPage,
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
