import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Header from 'modules/layout/components/Header'
import LivingPage from '../../../routes/living/containers/LivingPage'
import neuburgLogo from '../assets/neuburg.png'
import HeaderNavigationItem from '../HeaderNavigationItem'
import LivingFormPage from '../../../routes/living-form/containers/LivingFormPage'

class LivingHeader extends React.Component {
  static propTypes = {
    matchRoute: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
    viewportSmall: PropTypes.bool.isRequired
  }

  getCurrentParams () {
    return {
      location: this.props.location
    }
  }

  getNavigationItems () {
    const {matchRoute, currentPath} = this.props
    const currentParams = this.getCurrentParams()

    const form = new HeaderNavigationItem({
      href: matchRoute(LivingFormPage).stringify(currentParams),
      active: matchRoute(LivingFormPage).hasPath(currentPath),
      text: 'Form'
    })

    const info = new HeaderNavigationItem({
      href: matchRoute(LivingPage).stringify(currentParams),
      active: matchRoute(LivingPage).hasPath(currentPath),
      text: 'Info'
    })

    return [info, form]
  }

  render () {
    const {matchRoute} = this.props
    return <Header
      logo={neuburgLogo}
      viewportSmall={this.props.viewportSmall}
      logoHref={matchRoute(LivingPage).stringify(this.getCurrentParams())}
      actionItems={[]}
      navigationItems={this.getNavigationItems()} />
  }
}

export default translate('app')(LivingHeader)
