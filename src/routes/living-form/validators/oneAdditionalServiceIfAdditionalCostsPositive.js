import { isEmpty } from 'lodash'

export default (value, props, components) => {
  if (components['formData.costs.additionalCosts'][0].value > 0 &&
    isEmpty(components['formData.costs.ofAdditionalServices'])) {
    return `Sie müssen mindestens eine Leistung auswählen, wenn die Zusatzkosten größer 0 sind.`
  }
}
