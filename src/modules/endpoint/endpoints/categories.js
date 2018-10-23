import EndpointBuilder from '../EndpointBuilder'

import CategoryModel from '../models/CategoryModel'
import CategoriesMapModel from '../models/CategoriesMapModel'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'
import moment from 'moment'
import { toPairs } from 'lodash/object'
import { compose } from 'lodash/fp'
import normalizePath from 'normalize-path'

const PREFIX_LENGTH = 4

// Removes the (unnecessary) path prefix '/:cmsname/:lang/:parent_topic',
// e.g. '/neuburgschrobenhausenwohnraum/de/raumfrei'
function getPathWithoutPrefix (path) {
  if (!path) {
    return ''
  }
  const splitPath = path.split('/').slice(PREFIX_LENGTH)
  return `/${splitPath.join('/')}`
}

export default new EndpointBuilder('categories')
  .withStateToUrlMapper(state => {
    return `https://cms.integreat-app.de/${getCurrentCityConfig(state.cityConfigs._data).cmsName}` +
      `/de/wp-json/extensions/v3/pages`
  })
  .withMapper((json, state) => {
    const normalize = compose([decodeURIComponent, normalizePath, getPathWithoutPrefix])
    const basePath = '/'
    const categories = json.map(category => {
      return new CategoryModel({
        id: category.id,
        path: normalize(category.path),
        title: category.title,
        content: category.content,
        thumbnail: category.thumbnail,
        order: category.order,
        availableLanguages: new Map(toPairs(category.available_languages)
          .map(([key, value]) => [key, normalize(value.path)])),
        parentPath: normalize(category.parent.path || basePath),
        lastUpdate: moment(category.modified_gmt)
      })
    })

    // Set the page with path '/' as root page
    categories.find(categoryModel => categoryModel.path === '/').id = 0
    return new CategoriesMapModel(categories)
  })
  .build()
