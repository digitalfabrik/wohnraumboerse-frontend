import React from 'react'
import PropTypes from 'prop-types'
import Input from 'react-validation/build/input'
import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core'

class ArrayCheckbox extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
  }

  state = { checked: false }

  handleChange = (event, checked) => {
    this.setState({ checked })
  }

  render () {
    const checked = this.state.checked
    const { label, name, value, ...otherProps } = this.props
    return <FormControl>
      <FormControlLabel control={<Checkbox checked={checked} onChange={this.handleChange} {...otherProps} />} label={label} />
      {checked && <Input type='hidden' name={name} value={value} />}
    </FormControl>
  }
}

export default ArrayCheckbox
