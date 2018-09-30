import React from 'react'
import PropTypes from 'prop-types'
import { control } from 'react-validation'
import { FormControl, FormHelperText } from '@material-ui/core'

class CustomValidation extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    isChanged: PropTypes.bool,
    isUsed: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string
  }

  render () {
    const { error, isChanged, isUsed, ...otherProps } = this.props
    return <FormControl fullWidth>
      <input type='hidden' name='custom-validation' {...otherProps} value='' />
      <FormHelperText error>{error}</FormHelperText>
    </FormControl>
  }
}

export default control(CustomValidation)
