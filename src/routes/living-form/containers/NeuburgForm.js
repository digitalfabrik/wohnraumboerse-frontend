/* eslint-disable no-magic-numbers */
import React from 'react'
import PropTypes from 'prop-types'
import { Col, Grid, Row } from 'react-flexbox-grid'
import Form from 'react-validation/build/form'
import { forEach, map, set } from 'lodash'
import { FormControl, FormHelperText, InputAdornment, MenuItem } from '@material-ui/core'
import styled from 'styled-components'

import ArrayCheckbox from '../components/ArrayCheckbox'
import staatLogo from './assets/logo-stmas.jpg'
import { TextInput } from '../components/TextInput'
import required from '../validators/required'
import isEmail from '../validators/isEmail'
import SelectInput from '../components/SelectInput'
import needsAcceptance from '../validators/needsAcceptance'
import SubmitButton from '../components/SubmitButton'
import SingleCheckbox from '../components/SingleCheckbox'
import LawParagraph from '../components/LawParagraph'
import DateInput from '../components/DateInput'
import nonNegative from '../validators/nonNegative'
import integer from '../validators/integer'
import greaterEquals from '../validators/greaterEquals'
import CustomValidation from '../components/CustomValidation'
import oneRunningServiceIfRunningCostsPositive from '../validators/oneRunningServiceIfRunningCostsPositive'
import oneAdditionalServiceIfAdditionalCostsPositive from '../validators/oneAdditionalServiceIfAdditionalCostsPositive'
import oneRoom from '../validators/oneRoom'
import minMaxLength from '../validators/minMaxLength'
import maxLength from '../validators/maxLength'

const StdCol = props => <Col xs={12} md={6} {...props} />
const NarrowCol = props => <Col xs={6} md={4} {...props} />
const WideCol = props => <Col xs={12} md={12} {...props} />
const SubCaption = styled.p`
  margin: 5px 0;
  font-weight: bold;
`

const rooms = {
  kitchen: 'Küche',
  bath: 'Bad',
  wc: 'WC',
  child1: 'Kinderzimmer 1',
  child2: 'Kinderzimmer 2',
  child3: 'Kinderzimmer 3',
  bed: 'Schlafzimmer',
  livingroom: 'Wohnzimmer',
  hallway: 'Diele',
  store: 'Abstellraum',
  basement: 'Kellerraum',
  balcony: 'Balkon / Terrasse'
}

const runningServices = {
  heating: 'Heizung',
  water: 'Wasser/Abwasser',
  garbage: 'Müllabfuhr',
  chimney: 'Kaminkehrer',
  other: 'Sonstiges'
}

const additionalServices = {
  garage: 'Garage/Stellplatz',
  other: 'Sonstiges'
}

export class NeuburgForm extends React.Component {
  state = { form: null }

  static propTypes = {
    sendRequest: PropTypes.func.isRequired,
    sending: PropTypes.bool,
    serverError: PropTypes.string
  }

  setRef = form => {
    this.setState({ form })
  }

  validateAll = () => this.state.form.validateAll()

  render () {
    return <Form onSubmit={this.handleSubmit} ref={this.setRef}>
      <Grid>
        <h3>Kontaktdaten VermieterIn</h3>
        <Row>
          <StdCol>
            <TextInput name='formData.landlord.firstName' type='text' label='Vorname' validations={[required]} />
          </StdCol>
          <StdCol>
            <TextInput name='formData.landlord.lastName' type='text' label='Nachname' validations={[required]} />
          </StdCol>
          <StdCol>
            <TextInput name='email' type='text' label='E-Mail-Adresse'
                       validations={[required, isEmail]} />
          </StdCol>
          <StdCol>
            <TextInput name='formData.landlord.phone' type='text' label='Telefon' />
          </StdCol>
        </Row>

        <h3>Mietobjekt</h3>
        <Row>
          <WideCol><TextInput name='formData.accommodation.title' label='Kurzbeschreibung des Objekts'
                              validations={[required, minMaxLength(10, 50)]}
                              additionalLabel='z.B.: 2 ZKB mit Balkon und Garten, WG-geeignet' /></WideCol>
        </Row>
        <Row>
          <WideCol><TextInput name='formData.accommodation.location' label='Standort (optional)'
                              validations={[maxLength(85)]} /></WideCol>
        </Row>
        <Row>
          <StdCol><TextInput name='formData.accommodation.totalArea' label='Gesamtfläche der Wohnung'
                             validations={[required, nonNegative]} type='number' inputProps={{ min: '0', step: '0.01' }}
                             InputProps={{
                               startAdornment: <InputAdornment position='start'>qm</InputAdornment>
                             }} /></StdCol>
          <StdCol><TextInput name='formData.accommodation.totalRooms' label='Räume insgesamt'
                             validations={[required, greaterEquals(1), integer]} type='number'
                             inputProps={{ min: '1', step: '1' }} /></StdCol>
        </Row>
        <Row>
          {map(rooms, (label, key) => (
            <NarrowCol key={key}><ArrayCheckbox name='formData.accommodation.ofRooms' label={label}
                                                value={key} /></NarrowCol>
          ))}
          <WideCol><CustomValidation name='customValidation' validations={[oneRoom]} /></WideCol>
        </Row>
        <Row>
          <StdCol><DateInput
            label='Bezugsdatum'
            name='formData.accommodation.moveInDate'
          /></StdCol>
        </Row>

        <h3>Mietkosten</h3>
        <Row>
          <StdCol><TextInput name='formData.costs.baseRent' label='Grundmiete monatlich'
                             validations={[required, nonNegative]}
                             type='number' additionalLabel='Ohne Nebenkosten, Garage und Heizung'
                             inputProps={{ min: '0', step: '0.01' }}
                             InputProps={{ startAdornment: <InputAdornment position='start'>€</InputAdornment> }}
          /></StdCol>
          <StdCol><TextInput name='formData.costs.runningCosts' label='Nebenkosten monatlich'
                             validations={[required, nonNegative]}
                             type='number' inputProps={{ min: '0', step: '0.01' }}
                             InputProps={{
                               startAdornment: <InputAdornment position='start'>€</InputAdornment>
                             }} /></StdCol>
        </Row>
        <SubCaption>In Nebenkosten enthalten:</SubCaption>
        <Row>
          {map(runningServices, (label, key) => (
            <NarrowCol key={key}><ArrayCheckbox name='formData.costs.ofRunningServices' label={label}
                                                value={key} /></NarrowCol>
          ))}
          <WideCol><CustomValidation name='customValidation'
                                     validations={[oneRunningServiceIfRunningCostsPositive]} /></WideCol>
        </Row>
        <Row><WideCol><SingleCheckbox name='formData.costs.hotWaterInHeatingCosts'
                                      label='Warmwasser in Heizung enthalten' /></WideCol></Row>
        <Row><StdCol><TextInput name='formData.costs.additionalCosts' label='Zusatzkosten monatlich'
                                validations={[required, nonNegative]}
                                type='number' inputProps={{ min: '0', step: '0.01' }}
                                InputProps={{
                                  startAdornment: <InputAdornment position='start'>€</InputAdornment>
                                }} /></StdCol></Row>
        <SubCaption>In Zusatzkosten enthalten:</SubCaption>
        <Row>
          {map(additionalServices, (label, key) => (
            <NarrowCol key={key}><ArrayCheckbox name='formData.costs.ofAdditionalServices' label={label}
                                                value={key} /></NarrowCol>
          ))}
          <WideCol><CustomValidation name='customValidation'
                                     validations={[oneAdditionalServiceIfAdditionalCostsPositive]} /></WideCol>
        </Row>
        <h3>Gültigkeitsdauer und Datenschutz</h3>
        <Row>
          <StdCol>
            <SelectInput name='duration' label='Gültigkeitsdauer des Angebots' validations={[required]}>
              <MenuItem value={3}>3 Tage</MenuItem>
              <MenuItem value={7}>7 Tage</MenuItem>
              <MenuItem value={14}>14 Tage</MenuItem>
              <MenuItem value={30}>30 Tage</MenuItem>
            </SelectInput>
          </StdCol>
        </Row>
        <Row>
          <WideCol>
            <SingleCheckbox name='agreedToDataProtection'
                            label={<span>Ich akzeptiere die
                              <a target='_blank' href={'/datenschutz-und-kontakt'}>Datenschutzerklärung</a>.
                            </span>}
                            validations={[needsAcceptance]} />
            <LawParagraph>
              Außerdem willige ich ein, dass der Landkreis Neuburg-Schrobenhausen und die Tür an Tür - Digital Factory
              gGmbH meine personenbezogenen Daten zum Zwecke der Wohnraumakquise für anerkannte Flüchtlinge und
              bleibeberechtigte Migranten erheben, verarbeiten und nutzen. Der Zweck ist ausschließlich
              auf die Bearbeitung meines Mietangebots beschränkt.
            </LawParagraph>
            <LawParagraph>
              <strong>Hierzu stellt die Tür an Tür - Digital Factory gGmbH meine personenbezogenen Daten auf die
                öffentliche App Integreat</strong>, die vom Landkreis Neuburg-Schrobenhausen genutzt wird, um Wohnungen
              und Mietobjekte zielgerichtet zu vermitteln.
            </LawParagraph>
            <LawParagraph>
              Die Einwilligung kann verweigert bzw. jederzeit ohne Angabe von Gründen über den in der Bestätigungsmail
              versendeten Link zur dauerhaften Löschung widerrufen werden. In diesem Fall erfolgt keine Bearbeitung
              meines Mietangebots; alle gespeicherten personenbezogenen Daten werden gelöscht.
            </LawParagraph>
          </WideCol>
        </Row>
        <Row style={{ margin: '20px 0', justifyContent: 'center' }}>
          <Col center='true'>
            <FormControl>
              <SubmitButton validateAll={this.validateAll} type='submit' disabled={this.props.sending}>
                {this.props.sending ? 'Wird gesendet...' : 'Mietangebot Senden'}
              </SubmitButton>
              {this.props.serverError && <FormHelperText error>{this.props.serverError}</FormHelperText>}
            </FormControl>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center' }}>
          <StdCol>
            <img src={staatLogo} style={{ width: '100%' }} />
          </StdCol>
        </Row>
      </Grid>
    </Form>
  }

  handleSubmit = event => {
    event.preventDefault()
    const values = this.state.form.getValues()
    const requestBody = this.transformFormValuesToRequestBody(values)
    this.props.sendRequest(requestBody)
  }

  transformFormValuesToRequestBody (values) {
    // Transform flat object with properties including a dot to nested object
    const requestBody = {}
    forEach(values, (value, key) => set(requestBody, key, value))
    // Remove customValidation, since it's only a virtual input
    delete requestBody.customValidation
    // Make ofAdditionalCosts, ofRooms, ofAdditionalServices arrays (if not already)
    NeuburgForm.transformFieldToArray(requestBody.formData.accommodation, 'ofRooms')
    NeuburgForm.transformFieldToArray(requestBody.formData.costs, 'ofAdditionalServices')
    NeuburgForm.transformFieldToArray(requestBody.formData.costs, 'ofRunningServices')
    // Convert boolean values to actual bools
    NeuburgForm.transformFieldToBool(requestBody, 'agreedToDataProtection')
    NeuburgForm.transformFieldToBool(requestBody.formData.costs, 'hotWaterInHeatingCosts')
    return requestBody
  }

  static transformFieldToBool (object, key) {
    object[key] = object[key] === 'true'
  }

  static transformFieldToArray (object, key) {
    if (object[key] === undefined) {
      object[key] = []
    } else if (!Array.isArray(object[key])) {
      object[key] = [object[key]]
    }
  }
}

export default NeuburgForm
