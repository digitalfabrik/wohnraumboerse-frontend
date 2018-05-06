import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Footer from './Footer'
import DisclaimerPage from '../../../routes/disclaimer/containers/DisclaimerPage'
import { translate } from 'react-i18next'

class LivingFooter extends React.Component {
  static propTypes = {
    matchRoute: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }

  render () {
    return <Footer>
      <Link href={this.props.matchRoute(DisclaimerPage).stringify()}>
        {this.props.t('imprintAndContact')}
      </Link>
    </Footer>
  }
}

export default translate('app')(LivingFooter)
