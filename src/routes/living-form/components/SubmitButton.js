import React from 'react'
import PropTypes from 'prop-types'
import { button } from 'react-validation'
import { Button, FormHelperText } from 'material-ui'

class SubmitButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    hasErrors: PropTypes.bool,
    validateAll: PropTypes.func,
    onClick: PropTypes.func
  }
  state = {clicked: false}

  handleClick = event => {
    if (this.props.hasErrors) {
      this.props.validateAll()
      this.setState({clicked: true})
      event.preventDefault()
    }
  }

  render () {
    const {hasErrors, ...otherProps} = this.props
    delete otherProps.validateAll
    return <div style={{textAlign: 'center'}}>
      <Button variant='raised' {...otherProps} onClick={this.handleClick} />
      <FormHelperText>{hasErrors && this.state.clicked && 'Sie haben ungültige Eingaben.'}</FormHelperText>
    </div>
  }
}

export default button(SubmitButton)
