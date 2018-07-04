import React from 'react'
import PropTypes from 'prop-types'
import { Caption } from '@integreat-app/shared'
import { MenuItem, FormHelperText, FormControl } from '@material-ui/core'
import Form from 'react-validation/build/form'
import required from '../../living-form/validators/required'
import SelectInput from '../../living-form/components/SelectInput'
import SubmitButton from '../../living-form/components/SubmitButton'

const MILLISECONDS_IN_DAY = 864E5
export class ExtendOfferManager extends React.Component {
  static propTypes = {
    send: PropTypes.func.isRequired,
    sending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    serverError: PropTypes.string
  }

  handleSubmit = event => {
    event.preventDefault()
    const values = this.state.form.getValues()
    this.setState({duration: values.duration});
    this.props.send('POST', '/extend', values)
  }

  validateAll = () => this.state.form.validateAll()

  setRef = form => this.setState({form})

  render () {
    if (this.props.success) {
      const date = new Date(new Date().valueOf() + MILLISECONDS_IN_DAY * this.state.duration)
      return <React.Fragment>
        <Caption title={'Angebot erneuert'} />
        <p>Ihr Angebot wurde erfolgreich erneuert und ist jetzt bist zum <b>{date.toLocaleDateString('de')}</b> gültig.</p>
      </React.Fragment>
    }

    return <React.Fragment>
      <Caption title={'Angebot erneuern'} />
      <p>Wie lange soll Ihr Angebot gültig sein?</p>
      <Form onSubmit={this.handleSubmit} ref={this.setRef}>
        <SelectInput name='duration' label='Gültigkeitsdauer des Angebots' validations={[required]}>
          <MenuItem value={3}>3 Tage</MenuItem>
          <MenuItem value={7}>7 Tage</MenuItem>
          <MenuItem value={14}>14 Tage</MenuItem>
          <MenuItem value={30}>30 Tage</MenuItem>
        </SelectInput>
        <FormControl>
          <SubmitButton validateAll={this.validateAll} type='submit' disabled={this.props.sending}>
            {this.props.sending ? 'Wird erneuert...' : 'Mietangebot erneuern'}
          </SubmitButton>
          {this.props.serverError && <FormHelperText error>{this.props.serverError}</FormHelperText>}
        </FormControl>
      </Form>
    </React.Fragment>
  }
}

export default ExtendOfferManager
