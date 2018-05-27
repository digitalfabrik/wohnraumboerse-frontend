import React from 'react'
import PropTypes from 'prop-types'
import environment from 'environment.config'
import getCurrentCityConfig from '../../../modules/city-detection/getCurrentCityConfig'
import DeleteOfferManager from '../components/DeleteOfferManager'
import Failure from '../../../modules/common/components/Failure'
import ExtendOfferManager from '../components/ExtendOfferManager'
import ConfirmOfferManager from '../components/ConfirmOfferManager'
import { connect } from 'react-redux'

const cityConfig = getCurrentCityConfig()

const STATUS_OK = 200

export class LivingManageOfferPage extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired
  }

  state = {sending: false, success: false, serverError: null}

  send = (method, action = '', body = null) => {
    this.setState({sending: true, serverError: null, success: false})
    fetch(`${environment.apiBaseUrl}${cityConfig.cmsName}/offer/${this.props.token}${action}`, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: body && JSON.stringify(body)
    })
      .then(response => {
        if (response.status === STATUS_OK) {
          this.setState({success: response.status === STATUS_OK, sending: false})
        } else {
          response.text().then(text => this.setState({success: false, sending: false, serverError: text}))
        }
      })
      .catch(() => {
        this.setState({success: false, sending: false, serverError: 'Verbindung fehlgeschlagen'})
      })
  }

  static getManagerForAction (action) {
    switch (action) {
      case 'confirm':
        return ConfirmOfferManager
      case 'delete':
        return DeleteOfferManager
      case 'extend':
        return ExtendOfferManager
      default:
        return null
    }
  }

  render () {
    const Manager = LivingManageOfferPage.getManagerForAction(this.props.action)
    if (!Manager) {
      return <Failure error='not-found:page.notFound' />
    }

    return <Manager send={this.send} sending={this.state.sending} success={this.state.success}
                    serverError={this.state.serverError} />
  }
}

const mapStateToProps = state => ({
  token: state.router.params.token,
  action: state.router.params.action
})

export default connect(mapStateToProps)(LivingManageOfferPage)
