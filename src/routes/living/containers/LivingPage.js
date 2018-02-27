import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'

import withFetcher from 'modules/endpoint/hocs/withFetcher'
import CategoriesMapModel from 'modules/endpoint/models/CategoriesMapModel'
import LocationModel from 'modules/endpoint/models/LocationModel'
import Failure from 'modules/common/components/Failure'
import Page from 'modules/common/components/Page'

import Breadcrumbs from 'routes/categories/components/Breadcrumbs'
import CategoryList from 'routes/categories/components/CategoryList'

export class LivingPage extends React.Component {
  static propTypes = {
    living: PropTypes.instanceOf(CategoriesMapModel).isRequired,
    locations: PropTypes.arrayOf(PropTypes.instanceOf(LocationModel)).isRequired,
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
    const categories = this.props.living
    const children = categories.getChildren(category)

    if (children.length === 0) {
      // last level, our category is a simple page
      return <Page title={category.title}
                   content={category.content} />
    }
    // some level between, we want to display a list
    return <CategoryList categories={children.map(model => ({model, children: categories.getChildren(model)}))}
                         title={category.title}
                         content={category.content} />
  }

  render () {
    const category = this.props.living.getCategoryByUrl(this.props.path)
    if (!category) {
      return <Failure error='not-found:page.notFound' />
    }
    return <div>
      <Breadcrumbs
        parents={this.props.living.getAncestors(category)}
        locations={this.props.locations} />
      {this.getContent(category)}
    </div>
  }
}

const mapStateToProps = state => ({
  path: state.router.pathname
})

export default compose(
  connect(mapStateToProps),
  withFetcher('living'),
  withFetcher('locations')
)(LivingPage)
