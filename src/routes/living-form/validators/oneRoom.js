import { isEmpty } from 'lodash'

export default (value, props, components) => {
  if (isEmpty(components['formData.accommodation.ofRooms'])) {
    return `Sie müssen mindestens einen Raum auswählen.`
  }
}
