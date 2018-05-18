import React from 'react'
import getCurrentCityConfig from 'modules/city-detection/getCurrentCityConfig'
import serverConfig from 'server.config'
import { Caption } from '@integreat-app/shared'
import NeuburgForm from './NeuburgForm'
import Failure from '../../../modules/common/components/Failure'

const cityConfig = getCurrentCityConfig()
const STATUS_OK = 200

export class LivingFormPage extends React.Component {
  constructor () {
    super()
    this.state = {success: false}
  }

  sendRequest = requestBody => {
    console.log('Sending request with body:')
    console.log(requestBody)
    this.setState({sending: true})
    fetch(`${serverConfig.host}/v0/${cityConfig.cmsName}/`, {
      body: JSON.stringify(requestBody),
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => response.status)
      .then(status => this.setState({success: status === STATUS_OK}))
  }

  render () {
    if (cityConfig.cmsName !== 'neuburgschrobenhausenwohnraum') {
      return <Failure error='not-found:page.notFound' />
    }

    if (this.state.success) {
      return <Caption title={'Angebot wurde erstellt. Überprüfen Sie ihr E-Mail Postfach.'} />
    }

    return <React.Fragment>
      <Caption title={'Mietangebot erstellen'} />
      <NeuburgForm sendRequest={this.sendRequest} sending={this.state.sending} />
    </React.Fragment>
  }
}

export default LivingFormPage
