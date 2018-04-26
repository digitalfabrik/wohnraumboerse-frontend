import { Fragment } from 'redux-little-router'
import React from 'react'
import PropTypes from 'prop-types'
import RouteConfig from '../RouteConfig'
import { connect } from 'react-redux'
import LivingFormPage from '../../../routes/living-form/containers/LivingFormPage'
import LivingPage from '../../../routes/living/containers/LivingPage'
import LivingManageOfferPage from '../../../routes/living-manage-offer/containers/LivingManageOfferPage'
import LivingLayout from '../../layout/containers/LivingLayout'

const LANGUAGE_CODE_LENGTH = 2

export class RouterFragment extends React.Component {
  static propTypes = {
    viewportSmall: PropTypes.bool.isRequired,
    routeConfig: PropTypes.instanceOf(RouteConfig).isRequired
  }

  static isLanguageCode (language) {
    return language && language.length === LANGUAGE_CODE_LENGTH
  }

  redirectCondition = location => !RouterFragment.isLanguageCode(location.params.language)

  /**
   * This is the matchRoute from the supplied {@link routeConfig}
   *
   * @param id The id to look for
   * @returns {*|Route}
   */
  matchRoute = id => this.props.routeConfig.matchRoute(id)

  render () {
    /*
     * For routes inside a <React.Fragment /> the priority decreases with each element
     * So /disclaimer has higher priority than /:language -> '/disclaimer' resolves to /disclaimer
     */

    return <Fragment forRoute='/'>
      {/* Routes */}
      <React.Fragment>
        <LivingLayout matchRoute={this.matchRoute}>
          {/* Matches /augsburg/living/form */}
          <Fragment forRoute='/form'>
            <LivingFormPage />
          </Fragment>
          {/* Matches /augsburg/living/offer/asdf/:action */}
          <Fragment forRoute='/offer/:token/:action'>
            <LivingManageOfferPage />
          </Fragment>
          {/* Matches /augsburg/living/* */}
          <Fragment forNoMatch>
            <LivingPage />
          </Fragment>
        </LivingLayout>
      </React.Fragment>
    </Fragment>
  }
}

const mapStateToProps = state => ({
  viewportSmall: state.viewport.is.small
})

export default connect(mapStateToProps)(RouterFragment)
