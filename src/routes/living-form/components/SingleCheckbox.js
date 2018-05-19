import React from 'react'
import PropTypes from 'prop-types'
import { control } from 'react-validation'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core'

export class SingleCheckbox extends React.PureComponent {
  state = {checked: false}

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    isUsed: PropTypes.bool,
    isChanged: PropTypes.bool,
    error: PropTypes.string,
    onChange: PropTypes.func
  }

  handleChange = (event, checked) => {
    this.setState({checked})
    event.target.value = checked
    this.props.onChange(event)
  }

  render () {
    const checked = this.state.checked
    const {label, name, isUsed, isChanged, error, ...otherProps} = this.props
    delete otherProps.onBlur
    delete otherProps.onChange
    return <FormControl>
      <FormControlLabel control={<Checkbox value={checked.toString()} name={name} checked={checked} {...otherProps}
                                           onChange={this.handleChange} />}
                        label={label} />
      {isUsed && isChanged && error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  }
}

export default control(SingleCheckbox)
