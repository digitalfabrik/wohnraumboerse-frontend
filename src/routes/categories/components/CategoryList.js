import React from 'react'
import PropTypes from 'prop-types'

import CategoryModel from 'modules/endpoint/models/CategoryModel'

import style from './CategoryList.css'
import { Caption, RemoteContent } from '@integreat-app/shared'
import CategoryListItem from './CategoryListItem'

/**
 * Displays a ContentList which is a list of categories, a caption and a thumbnail
 */
class CategoryList extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      model: PropTypes.instanceOf(CategoryModel).isRequired,
      children: PropTypes.arrayOf(PropTypes.instanceOf(CategoryModel)).isRequired
    })).isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    hijackRegExp: PropTypes.string
  }

  render () {
    return (
      <div>
        {this.props.title && <Caption title={this.props.title} />}
        <RemoteContent hijackRegExp={this.props.hijackRegExp}
                       centered
                       dangerouslySetInnerHTML={{__html: this.props.content}} />
        <div className={style.list}>
          {this.props.categories.map(({model, children}) =>
            <CategoryListItem key={model.id} category={model} children={children} />)}
        </div>
      </div>
    )
  }
}

export default CategoryList
