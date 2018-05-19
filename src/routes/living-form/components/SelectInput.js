import React from 'react'
import PropTypes from 'prop-types'
import { control } from 'react-validation'
import { FormControl, FormHelperText, InputLabel, Select as MaterialSelect } from '@material-ui/core'

class SelectInput extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    isChanged: PropTypes.bool,
    isUsed: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string
  }

  state = {value: ''}

  handleChange = event => {
    this.setState({value: event.target.value})
    this.props.onChange(event)
  }

  render () {
    const {error, isChanged, isUsed, label, ...otherProps} = this.props
    // onBlur is not supported by MaterialUi's SelectInput
    delete otherProps.onBlur
    return <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MaterialSelect {...otherProps} value={this.state.value} onChange={this.handleChange} />
      <FormHelperText error>{(isChanged || isUsed) && error}</FormHelperText>
    </FormControl>
  }
}

export default control(SelectInput)
