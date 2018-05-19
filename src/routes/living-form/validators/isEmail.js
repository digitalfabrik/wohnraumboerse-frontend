import validator from 'validator'

export default value => {
  if (!validator.isEmail(value)) {
    return `E-Mail-Adresse ist ungültig.`
  }
}
