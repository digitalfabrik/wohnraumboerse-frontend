import React from 'react'
import getCurrentCityConfig from 'modules/city-detection/getCurrentCityConfig'
import environment from 'environment.config'
import { Caption } from '@integreat-app/shared'
import NeuburgForm from './NeuburgForm'
import Failure from '../../../modules/common/components/Failure'

const cityConfig = getCurrentCityConfig()
const STATUS_CREATED = 201
const SENDER_MAIL = 'keineantwort@integreat-app.de'

export class LivingFormPage extends React.Component {
  state = { success: false, serverError: null, sending: false, emailAddress: '' }

  sendRequest = requestBody => {
    this.setState({sending: true, serverError: null, emailAddress: requestBody.email})
    fetch(`${environment.apiBaseUrl}${cityConfig.cmsName}/offer/`, {
      body: JSON.stringify(requestBody),
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
      if (response.status === STATUS_CREATED) {
        this.setState({success: true, sending: false})
      } else {
        return response.json().then(error => this.setState({serverError: error.errorMessage, sending: false}))
      }
    })
      .catch(() => {
        this.setState({success: false, sending: false, serverError: 'Verbindung fehlgeschlagen'})
      })
  }

  render () {
    if (cityConfig.cmsName !== 'neuburgschrobenhausenwohnraum') {
      return <Failure error='not-found:page.notFound' />
    }

    if (this.state.success) {
      return <React.Fragment>
        <Caption title='Fast fertig' />
        <p>Ihr Angebot wurde erfolgreich erstellt. Sie müssen nur noch Ihre E-Mail-Adresse bestätigen:</p>
        <p>Sie erhalten von <i>${SENDER_MAIL}</i> eine E-Mail an <i>{this.state.emailAddress}</i> mit
          einem Bestätigungslink.
          Klicken Sie darauf, um das Angebot freizuschalten.</p>
        <p>Falls Sie keine E-Mail bekommen haben, überprüfen Sie bitte, ob Sie die richtige E-Mail-Adresse angegeben
          haben und ob die E-Mail in Ihrem Spam-Ordner gelandet ist.</p>
      </React.Fragment>
    }

    return <React.Fragment>
      <Caption title={'Mietangebot erstellen'} />
      <NeuburgForm sendRequest={this.sendRequest} sending={this.state.sending} serverError={this.state.serverError} />
    </React.Fragment>
  }
}

export default LivingFormPage
