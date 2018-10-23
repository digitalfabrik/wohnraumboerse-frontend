import EndpointBuilder from '../EndpointBuilder'

import CategoryModel from '../models/CategoryModel'
import CategoriesMapModel from '../models/CategoriesMapModel'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'
import moment from 'moment'
import { toPairs } from 'lodash/object'
import { compose } from 'lodash/fp'
import normalizePath from 'normalize-path'

const PREFIX_LENGTH = 3

// Removes the (unnecessary) path prefix ':cmsname/:lang/:parent_topic',
// e.g. '/neuburgschrobenhausenwohnraum/de/raumfrei
function getPathWithoutPrefix (url) {
  if (!url) {
    return null
  }
  const tempUrl = url.split('/').slice(PREFIX_LENGTH)
  return tempUrl.join('/')
}

export default new EndpointBuilder('categories')
  .withStateToUrlMapper(state => {
    return `https://cms.integreat-app.de/${getCurrentCityConfig(state.cityConfigs._data).cmsName}` +
      `/de/wp-json/extensions/v3/pages`
  })
  .withMapper((json, state) => {
    const normalize = compose([decodeURIComponent, normalizePath])
    const basePath = ``
    const categories = json.map(category => {
      const categoryModel = new CategoryModel({
        id: category.id,
        path: normalize(getPathWithoutPrefix(category.path)),
        title: category.title,
        content: category.content,
        thumbnail: category.thumbnail,
        order: category.order,
        availableLanguages: new Map(toPairs(category.available_languages)
          .map(([key, value]) => [key, normalize(value.path)])),
        parentPath: normalize(getPathWithoutPrefix(category.parent.path) || basePath),
        lastUpdate: moment(category.modified_gmt)
      })
      console.log(categoryModel)
      return categoryModel
    })

    return new CategoriesMapModel(categories)
  })
  .build()
