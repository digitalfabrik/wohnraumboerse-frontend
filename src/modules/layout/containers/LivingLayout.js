import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'
import Layout from '../components/Layout'
import LivingHeader from '../components/LivingHeader'
import LivingFooter from '../components/LivingFooter'

export class LivingLayout extends React.Component {
  static propTypes = {
    matchRoute: PropTypes.func.isRequired,
    currentPath: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    viewportSmall: PropTypes.bool.isRequired,
    children: PropTypes.node
  }

  render () {
    const {matchRoute} = this.props
    return <Layout header={<LivingHeader viewportSmall={this.props.viewportSmall}
                                         matchRoute={matchRoute} location={this.props.location}
                                         currentPath={this.props.currentPath} />}
                   footer={<LivingFooter />}>
      {this.props.children}
    </Layout>
  }
}

const mapStateToProps = state => ({
  currentPath: state.router.route,
  location: 'neuburgschrobenhausenwohnraum',
  viewportSmall: state.viewport.is.small
})

export default compose(
  connect(mapStateToProps)
)(LivingLayout)
