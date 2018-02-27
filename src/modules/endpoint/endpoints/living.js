import EndpointBuilder from '../EndpointBuilder'

import normalizeUrl from 'normalize-url'
import CategoryModel from '../models/CategoryModel'
import CategoriesMapModel from '../models/CategoriesMapModel'

export default new EndpointBuilder('living')
  .withStateToUrlMapper(state => `https://cms.integreat-app.de/${state.router.params.location}` +
    `/de/wp-json/extensions/v0/modified_content/pages?since=1970-01-01T00:00:00Z`)
  .withMapper((json, state) => {
    const baseUrl = `/${state.router.params.location}`
    const categories = json.filter(category => category.status === 'publish')
      .map(category => {
        var tempUrl = category.permalink.url_page.split('/')
        tempUrl.shift()
        var urlWithoutCity = tempUrl.join('/')
        return new CategoryModel({
          id: category.id,
          url: normalizeUrl(`${baseUrl}/living/${urlWithoutCity}`),
          title: category.title,
          parentId: category.parent,
          content: category.content,
          thumbnail: category.thumbnail,
          order: category.order,
          availableLanguages: category.available_languages
        })
      })

    categories.push(new CategoryModel({id: 0, url: baseUrl, title: state.router.params.location}))

    categories.forEach(category => {
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
