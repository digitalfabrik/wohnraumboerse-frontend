import { Fragment } from 'redux-little-router'
import React from 'react'
import PropTypes from 'prop-types'
import environment from 'environment.config'
import RouteConfig from '../RouteConfig'
import LivingFormPage from '../../../routes/living-form/containers/LivingFormPage'
import CategoriesPage from '../../../routes/categories/containers/CategoriesPage'
import LivingManageOfferPage from '../../../routes/living-manage-offer/containers/LivingManageOfferPage'
import LivingLayout from '../../layout/containers/LivingLayout'
import DisclaimerPage from '../../../routes/disclaimer/containers/DisclaimerPage'
import getCurrentCityConfig from '../../city-detection/getCurrentCityConfig'
import withFetcher from 'modules/endpoint/hocs/withFetcher'
import { Helmet } from 'react-helmet'
import CityConfig from '../../city-detection/CityConfig'
import compose from 'lodash/fp/compose'
import connect from 'react-redux/es/connect/connect'

class RouterFragment extends React.Component {
  static propTypes = {
    routeConfig: PropTypes.instanceOf(RouteConfig).isRequired,
    cityConfigs: PropTypes.arrayOf(CityConfig).isRequired
  }

  /**
   * This is the matchRoute from the supplied {@link routeConfig}
   *
   * @param id The id to look for
   * @returns {*|Route}
   */
  matchRoute = id => this.props.routeConfig.matchRoute(id)

  render () {
    console.log(`CityConfigs: ${JSON.stringify(this.props.cityConfigs)}`)
    const cityConfig = getCurrentCityConfig(this.props.cityConfigs)
    /*
     * For routes inside a <React.Fragment /> the priority decreases with each element
     * So /disclaimer has higher priority than /:language -> '/disclaimer' resolves to /disclaimer
     */
    return <Fragment forRoute='/'>
      {/* Routes */}
      <React.Fragment>
        <Helmet>
          <title>{cityConfig.title}</title>
          <link rel='icon' href={`${environment.apiBaseUrl}city-configs/image/${cityConfig.favicon}`} />
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

const mapStateToProps = state => ({
  cityConfigs: state.cityConfigs
})

export default compose(
  connect(mapStateToProps),
  withFetcher('cityConfigs')
)(RouterFragment)
