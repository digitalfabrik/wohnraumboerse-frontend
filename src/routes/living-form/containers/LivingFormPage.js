/* eslint-disable */
import React from 'react'
import { Control, Errors, Fieldset, LocalForm } from 'react-redux-form'
import { field } from './LivingFormPage.css'
import getCurrentCityConfig from 'modules/city-detection/getCurrentCityConfig'
import serverConfig from 'server.config'
import { Caption } from '@integreat-app/shared'
import NeuburgForm from './NeuburgForm'
import { MuiThemeProvider } from 'material-ui'

const cityConfig = getCurrentCityConfig()
const Address = () => (
  <Fieldset model=".address">
    <div className={field}>
      <label>Adresse:</label>
      <Control.text model=".address" />
    </div>
    <div className={field}>
      <label>City:</label>
      <Control.text model=".city" />
    </div>
    <div className={field}>
      <label>Bundesland:</label>
      <Control.text model=".state" />
    </div>
    <div className={field}>
      <label>Postleitzahl:</label>
      <Control.text model=".zip" />
    </div>
  </Fieldset>
)

export class LivingFormPage extends React.Component {
  constructor () {
    super()
    this.state = {success: false}
  }

  handleChange (values) {

  }

  handleUpdate (form) { }

  handleSubmit (values) {
    console.log(values)
    const {landlord, property} = values
    fetch(`${serverConfig.host}/v0/${cityConfig.cmsName}/`, {
      body: JSON.stringify({email: landlord.email, duration: property.duration * 24 * 60 * 60, formData: {}}),
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => response.status)
      .then(status => this.setState({success: status === 200}))
  }

  render () {
    if (this.state.success) {
      return <Caption title={'Angebot wurde erstellt. Überprüfen Sie ihr E-Mail Postfach.'} />
    }

    return <React.Fragment>
      <Caption title={'Mietangebot erstellen'} />
      <MuiThemeProvider>
        <NeuburgForm />
      </MuiThemeProvider>
    </React.Fragment>
  }
}

export default LivingFormPage
