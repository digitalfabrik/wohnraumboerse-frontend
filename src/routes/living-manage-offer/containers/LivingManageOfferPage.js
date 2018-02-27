/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'
import Caption from '../../../modules/common/components/Caption'

const NOT_STARTED = 'notstarted'
const DONE = 'done'
const FAILED = 'failed'
const PENDING = 'pending'

export class LivingManageOfferPage extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired
  }

  constructor () {
    super()
    this.state = {success: NOT_STARTED}
  }

  componentWillMount () {
    if (this.props.action === 'confirm') {
      this.send('POST', `/confirm`)
    }
  }

  send (method, action = '') {
    this.setState({success: PENDING})
    fetch(`http://server11.integreat-app.de:8080/v0/${this.props.location}/${this.props.token}${action}`, {
      method
    }).then(response => {
      console.log(response)
      return response
    })
      .then(response => response.status)
      .then(status => this.setState({success: status === 200 ? DONE : FAILED}))
  }

  render () {
    if (this.props.action === 'confirm') {
      if (this.state.success === NOT_STARTED || this.state.success === PENDING) {
        return <Caption title={'E-Mail wird bestätigt...'} />
      } else if (this.state.success === DONE) {
        return <Caption title={'E-Mail ist bestätigt.'} />
      } else if (this.state.success === FAILED) {
        return <Caption title={'Die E-Mail konnte nicht bestätigt werden.'} />
      }
    }

    if (this.props.action === 'delete') {
      if (this.state.success === NOT_STARTED) {
        return <div>
          <Caption title={'Soll das Angebot gelöscht werden?...'} />
          <button onClick={() => this.send('DELETE')}>Ja</button>
          <button onClick={() => alert('Ja dann halt nich')}>Nein</button>
        </div>
      } else if (this.state.success === PENDING) {
        return <Caption title={'Angebot wird gelöscht..'} />
      } else if (this.state.success === DONE) {
        return <Caption title={'Angebot wurde gelöscht.'} />
      } else if (this.state.success === FAILED) {
        return <Caption title={'Das Angebot konnte nicht gelöscht werden.'} />
      }
    }

    return <div>So eine Aktion wird nicht unterstützt!</div>
  }
}

const mapStateToProps = state => ({
  location: state.router.params.location,
  token: state.router.params.token,
  action: state.router.params.action
})

export default compose(
  connect(mapStateToProps)
)(LivingManageOfferPage)
