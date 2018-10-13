// @flow

import React from 'react'
import compose from 'lodash/fp/compose'

import withFetcher from 'modules/endpoint/hocs/withFetcher'
import { Page } from '@integreat-app/shared'

import DisclaimerModel from '../../../modules/endpoint/models/DisclaimerModel'

type PropsType = {| disclaimer: DisclaimerModel |}

const noop = () => {}

class DisclaimerPage extends React.Component<PropsType> {
  render () {
    return <div>
      <Page title={this.props.disclaimer.title} content={this.props.disclaimer.content} onInternLinkClick={noop} />
    </div>
  }
}

export default compose(
  withFetcher('disclaimer'),
  withFetcher('cityConfigs')
)(DisclaimerPage)
