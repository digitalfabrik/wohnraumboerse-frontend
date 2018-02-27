import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Header from 'modules/layout/components/Header'
import LivingPage from '../../../routes/living/containers/LivingPage'
import bayreuthLogo from '../assets/bayreuth.jpeg'

class LocationHeader extends React.Component {
  static propTypes = {
    matchRoute: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired,
    viewportSmall: PropTypes.bool.isRequired
  }

  getCurrentParams () {
    return {
      location: this.props.location
    }
  }

  render () {
    const {matchRoute} = this.props
    return <Header
      logo={bayreuthLogo}
      viewportSmall={this.props.viewportSmall}
      logoHref={matchRoute(LivingPage).stringify(this.getCurrentParams())}
      actionItems={[]}
      navigationItems={[]} />
  }
}

export default translate('app')(LocationHeader)
