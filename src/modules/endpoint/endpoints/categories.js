import EndpointBuilder from '../EndpointBuilder'

import normalizeUrl from 'normalize-url'
import CategoryModel from '../models/CategoryModel'
import CategoriesMapModel from '../models/CategoriesMapModel'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'

function getUrlWithoutCity (url) {
  const tempUrl = url.split('/')
  tempUrl.shift()
  return tempUrl.join('/')
}

export default new EndpointBuilder('categories')
  .withStateToUrlMapper(state => `https://cms.integreat-app.de/${getCurrentCityConfig().cmsName}/de/wp-json/extensions/v0/modified_content/pages?since=1970-01-01T00:00:00Z`)
  .withMapper((json, state) => {
    const baseUrl = ``
    const categories = json.filter(category => category.status === 'publish')
      .map(category => {
        return new CategoryModel({
          id: category.id,
          url: normalizeUrl(`${baseUrl}/${getUrlWithoutCity(category.permalink.url_page)}`),
          title: category.title,
          parentId: category.parent,
          content: category.content,
          thumbnail: category.thumbnail,
          order: category.order
        })
      })

    const root = categories.find(_category => _category._url === baseUrl)
    const rootId = root.id
    root.setId(0)

    categories.forEach(category => {
      if (category.parentId === rootId) {
        category.setParentId(0)
      }
      if (category.id !== 0) {
        const parent = categories.find(_category => _category.id === category.parentId)
        if (!parent) {
          throw new Error(`Invalid data from categories endpoint: Page with id ${category.id} has no parent.`)
        }
        category.setParentUrl(parent.url)
      }
    })

    return new CategoriesMapModel(categories)
  })
  .build()
