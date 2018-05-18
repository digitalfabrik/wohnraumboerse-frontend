import React from 'react'
import PropTypes from 'prop-types'
import { FormControl } from '@material-ui/core'
import { DatePicker } from 'material-ui-pickers'
import Input from 'react-validation/build/input'
import moment from 'moment'

class DateInput extends React.Component {
  state = {value: moment()}

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string
  }

  handleChange = value => {
    this.setState({value})
  }

  render () {
    const value = this.state.value
    const {label, name, ...otherProps} = this.props
    return <FormControl fullWidth>
      <DatePicker {...otherProps} value={value} onChange={this.handleChange} label={label} disablePast
                  autoOk okLabel='OK' cancelLabel='Abbrechen' format='Do MMMM YYYY' />
      <Input type='hidden' name={name} value={value.toString()} {...otherProps} />
    </FormControl>
  }
}

export default DateInput
