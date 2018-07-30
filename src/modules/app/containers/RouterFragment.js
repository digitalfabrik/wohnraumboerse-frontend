import { Fragment } from 'redux-little-router'
import React from 'react'
import PropTypes from 'prop-types'
import RouteConfig from '../RouteConfig'
import LivingFormPage from '../../../routes/living-form/containers/LivingFormPage'
import CategoriesPage from '../../../routes/categories/containers/CategoriesPage'
import LivingManageOfferPage from '../../../routes/living-manage-offer/containers/LivingManageOfferPage'
import LivingLayout from '../../layout/containers/LivingLayout'
import DisclaimerPage from '../../../routes/disclaimer/containers/DisclaimerPage'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'
import { Helmet } from 'react-helmet'

class RouterFragment extends React.Component {
  static propTypes = {
    routeConfig: PropTypes.instanceOf(RouteConfig).isRequired
  }

  /**
   * This is the matchRoute from the supplied {@link routeConfig}
   *
   * @param id The id to look for
   * @returns {*|Route}
   */
  matchRoute = id => this.props.routeConfig.matchRoute(id)

  render () {
    const cityConfig = getCurrentCityConfig()
    /*
     * For routes inside a <React.Fragment /> the priority decreases with each element
     * So /disclaimer has higher priority than /:language -> '/disclaimer' resolves to /disclaimer
     */
    return <Fragment forRoute='/'>
      {/* Routes */}
      <React.Fragment>
        <Helmet>
          <title>{cityConfig.title}</title>
          <link rel='icon' href={cityConfig.favicon} />
        </Helmet>
        <LivingLayout matchRoute={this.matchRoute}>
          {/* Matches /form */}
          <Fragment forRoute='/form'>
            <LivingFormPage />
          </Fragment>
          {/* Matches /disclaimer */}
          <Fragment forRoute='/disclaimer'>
            <DisclaimerPage />
          </Fragment>
          {/* Matches /offer/:token/:action */}
          <Fragment forRoute='/offer/:token/:action'>
            <LivingManageOfferPage />
          </Fragment>
          {/* Matches /* */}
          <Fragment forNoMatch>
            <CategoriesPage />
          </Fragment>
        </LivingLayout>
      </React.Fragment>
    </Fragment>
  }
}

export default RouterFragment
