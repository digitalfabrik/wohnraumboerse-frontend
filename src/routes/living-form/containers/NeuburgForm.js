import React from 'react'
import { set } from 'lodash/object'
import getCurrentCityConfig from 'modules/city-detection/getCurrentCityConfig'
import serverConfig from 'server.config'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Button from 'material-ui/Button'
import styled from 'styled-components'

const cityConfig = getCurrentCityConfig()

const Row = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  & > * {
    margin-right: 15px !important;
    margin-bottom: 15px !important;
  }
`

export class LivingFormPage extends React.Component {
  constructor () {
    super()
    this.state = {
      emailAddress: '',
      landlord: {
        firstName: '',
        lastName: ''
      },
      accommodation: {
        totalArea: null,
        totalRooms: null,
        ofRooms: [],
        moveInDate: null
      },
      costs: {
        baseRent: null,
        runningCosts: null,
        ofRunningServices: [],
        hotWaterInHeatingCosts: null,
        additionalCosts: null,
        ofAdditionalCosts: [],
        ofAdditionalServices: []
      }
    }
  }

  handleChange = event => {
    const formData = {...this.state}
    set(formData, event.target.name, event.target.value)
    this.setState(formData)
  }

  render () {
    const form = this.state
    return <ValidatorForm>
      <h2>Kontaktdaten Vermieter_in:</h2>
      <Row>
        <TextValidator label='Name' name='landlord.lastname' />
        <TextValidator label='Vorname' name='landlord.firstname' />
      </Row>
      <Row><TextValidator label='Telefon' name='landlord.telephone' /></Row>
      <Row><TextValidator label='E-Mail-Adresse'
                          name='emailAddress'
                          value={form.emailAddress}
                          validators={['required', 'isEmail']}
                          errorMessages={['Dieses Feld ist benötigt.', 'E-Mail-Adresse ist ungültig.']}
                          onChange={this.handleChange}
                           /></Row>
      <h2>Kontaktdaten Vermieter_in:</h2>
      <TextValidator label='Kaltmiete' name='accommodation.baseRent' />

      <br /><br />
      <Button variant='raised' color='primary'>Formular Abschicken</Button>
    </ValidatorForm>
  }

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
}

export default LivingFormPage
