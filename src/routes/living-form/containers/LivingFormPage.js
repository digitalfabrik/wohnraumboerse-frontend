/* eslint-disable */
import React from 'react'
import { Control, Errors, Fieldset, LocalForm } from 'react-redux-form'
import { field } from './LivingFormPage.css'
import Caption from 'modules/common/components/Caption'
import getCurrentCityConfig from 'modules/city-detection/getCurrentCityConfig'
import serverConfig from 'server.config'

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
      return <Caption title={'Angebot wurde erstellt. Überprüfen Sie ihr E-Mail Postfach :)'} />
    }

    return (
      <LocalForm
        onUpdate={(form) => this.handleUpdate(form)}
        onChange={(values) => this.handleChange(values)}
        onSubmit={(values) => this.handleSubmit(values)}
      >

        <Caption title={'Angaben zum Vermieter'} />
        <Fieldset model=".landlord">
          {/*<div className={field}>*/}
          {/*<label>Name:</label>*/}
          {/*<Control.text model="landlord.name" />*/}
          {/*</div>*/}

          {/*<div className={field}>*/}
          {/*<label>Nachname:</label>*/}
          {/*<Control.text model="landlord.lastname" />*/}
          {/*</div>*/}

          {/*<div className={field}>*/}
          {/*<label>Telefon:</label>*/}
          {/*<Control.text model="landlord.phone" />*/}
          {/*</div>*/}

          <div className={field}>
            <label>E-Mail:</label>
            <Control.text type="email" model=".email" required />
            <Errors
              model=".email"
              show="touched"
              messages={{
                valueMissing: 'Email fehlt.',
                typeMismatch: 'Die Eingabe muss eine email sein.',
                isEmail: 'Eingabe muss eine E-Mail sein'
              }}
            />
          </div>

          {/*<Address />*/}
        </Fieldset>


        <Caption title={'Angaben zum Mietobjekt'} />
        <Fieldset model=".property">
          {/*<Address />*/}

          {/*<div className={field}>*/}
          {/*<label>Gesamtfläche der Wohnung:</label>*/}
          {/*<Control.text*/}
          {/*type="number"*/}
          {/*model=".space"*/}
          {/*/>*/}
          {/*</div>*/}

          <div className={field}>
            <label>Dauer des Angebots in Tage:</label>
            <Control.text
              type="number"
              model=".duration"
              min={1} required />
            <Errors
              model=".duration"
              show="touched"
              messages={{
                valueMissing: 'Dauer fehlt.',
                typeMismatch: 'Dauer muss eine Zahl sein',
                rangeUnderflow: 'Die Dauer muss größer als 0 sein.'
              }}
            />
          </div>
        </Fieldset>

        <button type="submit">Abschicken</button>
      </LocalForm>
    )
  }
}

export default LivingFormPage
