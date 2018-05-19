import React from 'react'
import PropTypes from 'prop-types'
import { Caption } from '@integreat-app/shared'
import Spinner from 'react-spinkit'

export class ConfirmOfferManager extends React.Component {
  static propTypes = {
    send: PropTypes.func.isRequired,
    sending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    serverError: PropTypes.string
  }

  componentWillMount () {
    // Immediately send confirmRequest
    this.props.send('POST', `/confirm`)
  }

  render () {
    if (this.props.sending) {
      return <Spinner name='line-scale-party' />
    } else if (this.props.success) {
      return <React.Fragment>
        <Caption title='E-Mail-Adresse bestätigt' />
        <p>
          Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Ihr Angebot ist nun in der Integreat-App öffentlich
          verfügbar.
        </p>
        <p>
          Wir haben Ihnen eine weitere E-Mail geschickt: Darin finden Sie die Links, mit denen Sie das Angebot
          frühzeitig löschen oder
          die Gültigkeitsdauer des Angebots verlängern können.
        </p>
      </React.Fragment>
    } else {
      return <React.Fragment>
        <Caption title={'E-Mail-Adresse konnte nicht bestätigt werden'} />
        {this.props.serverError && <p>Folgender Fehler ist aufgetreten:</p>}
        {this.props.serverError && <p>{this.props.serverError}</p>}
      </React.Fragment>
    }
  }
}

export default ConfirmOfferManager
