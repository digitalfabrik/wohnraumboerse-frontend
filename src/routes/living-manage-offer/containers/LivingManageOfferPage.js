import React from 'react'
import PropTypes from 'prop-types'
import environment from 'environment.config'
import DeleteOfferManager from '../components/DeleteOfferManager'
import Failure from '../../../modules/common/components/Failure'
import ExtendOfferManager from '../components/ExtendOfferManager'
import ConfirmOfferManager from '../components/ConfirmOfferManager'
import withFetcher from 'modules/endpoint/hocs/withFetcher'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'
import { OK } from 'http-status-codes'
import CityConfig from 'modules/city-detection/CityConfig'
import getCurrentCityConfig from 'modules/city-detection/getCurrentCityConfig'

export class LivingManageOfferPage extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    cityConfigs: PropTypes.arrayOf(CityConfig).isRequired
  }

  state = {sending: false, success: false, serverError: null}

  send = (method, action = '', body = null) => {
    this.setState({sending: true, serverError: null, success: false})
    const cmsName = getCurrentCityConfig(this.props.cityConfigs).cmsName
    fetch(`${environment.apiBaseUrl}${cmsName}/offer/${this.props.token}${action}`, {
      method,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: body && JSON.stringify(body)
    })
      .then(response => {
        if (response.status === OK) {
          this.setState({success: response.status === OK, sending: false, serverError: null})
        } else {
          response.json().then(error => this.setState({
            success: false,
            sending: false,
            serverError: {
              status: response.status,
              message: error.errorMessage
            }
          }))
        }
      })
      .catch(() => {
        this.setState({
          success: false,
          sending: false,
          serverError: {status: 0, message: 'Die Verbindung ist fehlgeschlagen.'}
        })
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

export default compose(
  connect(mapStateToProps),
  withFetcher('cityConfigs')
)(LivingManageOfferPage)
