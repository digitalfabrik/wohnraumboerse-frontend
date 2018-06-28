import React from 'react'
import PropTypes from 'prop-types'

import withFetcher from 'modules/endpoint/hocs/withFetcher'
import { Page } from '@integreat-app/shared'

import DisclaimerModel from '../../../modules/endpoint/models/DisclaimerModel'

class DisclaimerPage extends React.Component {
  static propTypes = {
    disclaimer: PropTypes.instanceOf(DisclaimerModel).isRequired
  }

  render () {
    return <div>
      <Page title={this.props.disclaimer.title} content={this.props.disclaimer.content} />
    </div>
  }
}

export default withFetcher('disclaimer')(DisclaimerPage)
