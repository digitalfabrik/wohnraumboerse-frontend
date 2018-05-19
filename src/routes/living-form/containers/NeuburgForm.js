import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Form from 'react-validation/build/form'
import { set, forEach, map } from 'lodash'
import { InputAdornment, MenuItem } from '@material-ui/core'

import ArrayCheckbox from '../components/ArrayCheckbox'
import staatLogo from './assets/logo-stmas.png'
import { TextInput } from '../components/TextInput'
import required from '../validators/required'
import isEmail from '../validators/isEmail'
import SelectInput from '../components/SelectInput'
import needsAcceptance from '../validators/needsAcceptance'
import SubmitButton from '../components/SubmitButton'
import SingleCheckbox from '../components/SingleCheckbox'
import LawParagraph from '../components/LawParagraph'
import DateInput from '../components/DateInput'

const StdCol = props => <Col xs={12} md={6} {...props} />
const NarrowCol = props => <Col xs={6} md={4} {...props} />
const WideCol = props => <Col xs={12} md={12} {...props} />

const rooms = {
  kitchen: 'Küche',
  bath: 'Bad',
  wc: 'WC',
  child1: 'Kinderzimmer 1',
  child2: 'Kinderzimmer 2',
  child3: 'Kinderzimmer 3',
  bed: 'Schlafzimmer',
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

export class LivingFormPage extends React.Component {
  state = {form: null}

  static propTypes = {
    sendRequest: PropTypes.func.isRequired
  }

  setRef = form => {
    this.setState({form})
  }

  validateAll = () => this.state.form.validateAll()

  render () {
    return <Form onSubmit={this.handleSubmit} ref={this.setRef}>
      <Grid>
        <h3>Kontaktdaten VermieterIn</h3>
        <Row>
          <StdCol><TextInput name='formData.landlord.firstName' type='text' label='Vorname' validations={[required]} /></StdCol>
          <StdCol><TextInput name='formData.landlord.lastName' type='text' label='Nachname' validations={[required]} /></StdCol>
          <StdCol><TextInput name='email' type='text' label='E-Mail-Adresse'
                             validations={[required, isEmail]} /></StdCol>
          <StdCol><TextInput name='landlord.phone' type='text' label='Telefon' /></StdCol>
        </Row>

        <h3>Mietobjekt</h3>
        <Row>
          <StdCol><TextInput name='formData.accommodation.totalArea' label='Gesamtfläche der Wohnung'
                             validations={[required]} type='number'
                             InputProps={{
                               startAdornment: <InputAdornment position='start'>qm</InputAdornment>
                             }} /></StdCol>
          <StdCol><TextInput name='formData.accommodation.totalRooms' label='Räume insgesamt'
                             validations={[required]} type='number' /></StdCol>
        </Row>
        <Row>
          {map(rooms, (label, key) => (
            <NarrowCol key={key}><ArrayCheckbox name='formData.accommodation.ofRooms' label={label}
                                                value={key} /></NarrowCol>
          ))}
        </Row>
        <Row>
          <StdCol><DateInput
            label='Bezugsdatum'
            name='formData.accommodation.moveInDate'
          /></StdCol>
        </Row>

        <h3>Mietkosten</h3>
        <Row>
          <StdCol><TextInput name='formData.costs.baseRent' label='Grundmiete monatlich' validations={[required]}
                             type='number' additionalLabel='Ohne Nebenkosten, Garage und Heizung'
                             InputProps={{startAdornment: <InputAdornment position='start'>€</InputAdornment>}}
          /></StdCol>
          <StdCol><TextInput name='formData.costs.runningCosts' label='Nebenkosten monatlich' validations={[required]}
                             type='number'
                             InputProps={{
                               startAdornment: <InputAdornment position='start'>€</InputAdornment>
                             }} /></StdCol>
        </Row>
        <Row>
          {map(runningServices, (label, key) => (
            <NarrowCol key={key}><ArrayCheckbox name='formData.costs.ofRunningServices' label={label}
                                                value={key} /></NarrowCol>
          ))}
        </Row>
        <Row><WideCol><SingleCheckbox name='formData.costs.hotWaterInHeatingCosts'
                                      label='Warmwasser in Heizung enthalten' /></WideCol></Row>
        <Row><StdCol><TextInput name='formData.costs.additionalCosts' label='Zusatzkosten monatlich'
                                validations={[required]}
                                type='number'
                                InputProps={{
                                  startAdornment: <InputAdornment position='start'>€</InputAdornment>
                                }} /></StdCol></Row>
        <Row>
          {map(additionalServices, (label, key) => (
            <NarrowCol key={key}><ArrayCheckbox name='formData.costs.ofAdditionalServices' label={label}
                                                value={key} /></NarrowCol>
          ))}
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
            <SingleCheckbox name='agreedToDataProtection' label='Ich akzeptiere die Datenschutzerklärung:'
                            validations={[needsAcceptance]} />
            <LawParagraph>
              Ich willige ein, dass der Landkreis Neuburg-Schrobenhausen und die Tür an
              Tür - Digital Factory gGmbH meine personenbezogenen Daten zum Zwecke
              der Wohnraumakquise für Anerkannte Flüchtlinge und bleibeberechtigte
              Migranten erheben, verarbeiten und nutzen. Der Zweck ist ausschließlich
              auf die Bearbeitung meines Mietangebots beschränkt.
            </LawParagraph>
            <LawParagraph>
              Hierzu stellt die Tür an Tür - Digital Factory gGmbH meine
              personenbezogenen Daten auf die öffentliche App Integreat, die vom
              Landkreis Neuburg-Schrobenhausen genutzt wird, um Wohnungen und
              Mietobjekte zielgerichtet zu vermitteln.
            </LawParagraph>
            <LawParagraph>
              Die Einwilligung kann verweigert bzw. jederzeit ohne Angabe von Gründen über den in der Bestätigungsmail
              versendeten Link zur dauerhaften Löschung widerrufen werden. In diesem
              Fall erfolgt keine Bearbeitung meines Mietangebots; alle gespeicherten
              personenbezogenen Daten werden gelöscht.
            </LawParagraph>
          </WideCol>
        </Row>
        <Row style={{margin: '20px 0', justifyContent: 'center'}}>
          <Col center='true'><SubmitButton validateAll={this.validateAll} type='submit' disabled={this.state.fetching}>
            Mietangebot Senden</SubmitButton></Col>
        </Row>
        <Row>
          <StdCol>
            Dieses Projekt wird aus Mitteln des Bayerischen Staatsministeriums für Arbeit und Soziales, Familie und
            Integration gefördert.
          </StdCol>
          <StdCol>
            <img src={staatLogo} style={{width: '100%'}} />
          </StdCol>
        </Row>
      </Grid>
    </Form>
  }

  handleSubmit = event => {
    event.preventDefault()
    const values = this.state.form.getValues()
    // Transform flat object with properties including a dot to nested object
    const requestBody = {}
    forEach(values, (value, key) => set(requestBody, key, value))
    // Make ofAdditionalCosts, ofRooms, ofAdditionalServices arrays (if not already)
    if (!Array.isArray(requestBody.formData.accommodation.ofRooms)) {
      requestBody.formData.accommodation.ofRooms = [requestBody.formData.accommodation.ofRooms].filter(key => key)
    }
    if (!Array.isArray(requestBody.formData.costs.ofAdditionalServices)) {
      requestBody.formData.costs.ofAdditionalServices = Array.of(requestBody.formData.costs.ofAdditionalServices).filter(key => key)
    }
    if (!Array.isArray(requestBody.formData.costs.ofRunningServices)) {
      requestBody.formData.costs.ofRunningServices = Array.of(requestBody.formData.costs.ofRunningServices).filter(key => key)
    }
    // Convert boolean values to actual bools
    requestBody.agreedToDataProtection = requestBody.agreedToDataProtection === 'true'
    requestBody.formData.costs.hotWaterInHeatingCosts = requestBody.formData.costs.hotWaterInHeatingCosts === 'true'

    this.props.sendRequest(requestBody)
  }
}

export default (LivingFormPage)
