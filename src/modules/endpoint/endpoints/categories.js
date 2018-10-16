import EndpointBuilder from '../EndpointBuilder'

import CategoryModel from '../models/CategoryModel'
import CategoriesMapModel from '../models/CategoriesMapModel'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'
import moment from 'moment'
import { compose, toPairs } from 'lodash'
import normalizePath from 'normalize-path'

const PREFIX_LENGTH = 3

// Removes the (unnecessary) path prefix
function getPathWithoutPrefix (url) {
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
      return new CategoryModel({
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
    })

    return new CategoriesMapModel(categories)
  })
  .build()
