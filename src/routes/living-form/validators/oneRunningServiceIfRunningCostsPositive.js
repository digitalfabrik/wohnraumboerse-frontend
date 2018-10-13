import { isEmpty } from 'lodash'

export default (value, props, components) => {
  if (components['formData.costs.runningCosts'][0].value > 0 &&
    isEmpty(components['formData.costs.ofRunningServices'])) {
    return `Sie müssen mindestens eine Leistung auswählen, wenn die Nebenkosten größer 0 sind.`
  }
}
