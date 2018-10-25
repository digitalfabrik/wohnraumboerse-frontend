import normalizePath from 'normalize-path'

/**
 * Contains a Map [string -> CategoryModel] and some helper functions
 */
class CategoriesMapModel {
  /**
   * Creates a Map [url -> category] from the categories provided,
   * whose parent attributes are first changed from id to url
   * @param categories CategoryModels as array
   */
  constructor (categories = []) {
    this._categories = new Map(categories.map(category => ([category.path, category])))
  }

  /**
   * @return {CategoryModel[]} categories The categories as array
   */
  toArray () {
    return Array.from(this._categories.values())
  }

  /**
   * Returns the category with the given url
   * @param {String} path The path
   * @return {CategoryModel | undefined} The category
   */
  findCategoryByPath (path) {
    return this._categories.get(decodeURIComponent(normalizePath(path)))
  }

  /**
   * Returns all children of the given category
   * @param category The category
   * @return {CategoryModel[] | undefined} The children
   */
  getChildren (category) {
    return this.toArray()
      .filter(_category => _category.parentPath === category.path && _category !== category)
      .sort((category1, category2) => (category1.order - category2.order))
  }

  /**
   * Returns all (mediate) parents of the given category
   * @param category The category
   * @return {CategoryModel[]} The parents, with the immediate parent last
   */
  getAncestors (category) {
    const parents = []

    while (category.id !== 0) {
      const parent = this.findCategoryByPath(category.parentPath)
      if (!parent) {
        throw new Error(`The category '${category.parentPath}' ` +
          `does not exist but should be the parent of '${category.path}'`)
      }
      category = parent
      parents.unshift(category)
    }
    return parents
  }
}

export default CategoriesMapModel
