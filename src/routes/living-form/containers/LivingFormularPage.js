import React from 'react'
import { connect } from 'react-redux'
import compose from 'lodash/fp/compose'

export class LivingFormPage extends React.Component {
  static propTypes = {
    // categories: PropTypes.instanceOf(CategoriesMapModel).isRequired
  }

  render () {
    return <div>LivingFormPage</div>
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  language: state.router.params.language,
  location: state.router.params.location,
  path: state.router.pathname,
  categoryId: state.router.query.id
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(LivingFormPage)
