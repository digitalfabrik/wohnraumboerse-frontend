import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'

import withFetcher from 'modules/endpoint/hocs/withFetcher'
import CategoriesMapModel from 'modules/endpoint/models/CategoriesMapModel'
import { Page, Breadcrumbs } from '@integreat-app/shared'

import CategoryList from 'routes/categories/components/CategoryList'
import Failure from '../../../modules/common/components/Failure'
import { Link } from 'redux-little-router'

export class CategoriesPage extends React.Component {
  static propTypes = {
    categories: PropTypes.instanceOf(CategoriesMapModel).isRequired,
    path: PropTypes.string
  }

  /**
   * Returns the content to be displayed, based on the current category, which is
   * a) page with information
   * b) table with categories
   * c) list with categories
   * @param category The current category
   * @return {*} The content to be displayed
   */
  getContent (category) {
    const categories = this.props.categories
    const children = categories.getChildren(category)

    if (children.length === 0) {
      // last level, our category is a simple page
      return <Page title={category.title}
                   content={category.content} />
    }
    // some level between, we want to display a list
    return <CategoryList
      categories={children.map(model => ({
        model,
        children: categories.getChildren(model)
      }))}
      title={category.title}
      content={category.content} />
  }

  getBreadcrumbs (category) {
    return this.props.categories.getAncestors(category).map(
      category => <Link key={category.url} href={category.url}>{category.title}</Link>
    )
  }

  render () {
    const category = this.props.categories.getCategoryByUrl(this.props.path)
    if (!category) {
      return <Failure error='not-found:page.notFound' />
    }
    return <div>
      <Breadcrumbs>
        {this.getBreadcrumbs(category)}
      </Breadcrumbs>
      {this.getContent(category)}
    </div>
  }
}

const mapStateToProps = state => ({
  path: state.router.pathname
})

export default compose(
  connect(mapStateToProps),
  withFetcher('categories')
)(CategoriesPage)
