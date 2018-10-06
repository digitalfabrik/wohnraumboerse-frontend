import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Header from 'modules/layout/components/Header'
import CategoriesPage from '../../../routes/categories/containers/CategoriesPage'
import HeaderNavigationItem from '../HeaderNavigationItem'
import LivingFormPage from '../../../routes/living-form/containers/LivingFormPage'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'
import CityConfig from '../../city-detection/CityConfig'
import compose from 'lodash/fp/compose'
import { connect } from 'react-redux'
import withFetcher from '../../endpoint/hocs/withFetcher'

class LivingHeader extends React.Component {
  static propTypes = {
    matchRoute: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
    viewportSmall: PropTypes.bool.isRequired,
    cityConfigs: PropTypes.arrayOf(CityConfig),
    t: PropTypes.func.isRequired
  }

  getCurrentParams () {
    return {
      location: this.props.location
    }
  }

  getNavigationItems () {
    if (!getCurrentCityConfig(this.props.cityConfigs).formsEnabled) {
      return []
    }
    const {matchRoute, currentPath, t} = this.props
    const currentParams = this.getCurrentParams()

    const form = new HeaderNavigationItem({
      href: matchRoute(LivingFormPage).stringify(currentParams),
      active: matchRoute(LivingFormPage).hasPath(currentPath),
      text: t('toForm')
    })

    const info = new HeaderNavigationItem({
      href: matchRoute(CategoriesPage).stringify(currentParams),
      active: matchRoute(CategoriesPage).hasPath(currentPath),
      text: t('information')
    })

    return [info, form]
  }

  render () {
    const {matchRoute} = this.props
    return <Header
      logo={getCurrentCityConfig(this.props.cityConfigs).logo}
      viewportSmall={this.props.viewportSmall}
      logoHref={matchRoute(CategoriesPage).stringify(this.getCurrentParams())}
      actionItems={[]}
      navigationItems={this.getNavigationItems()} />
  }
}

const mapStateToProps = state => ({
  cityConfigs: state.cityConfigs
})

export default compose(
  translate('app'),
  connect(mapStateToProps),
  withFetcher('cityConfigs')
)(LivingHeader)
