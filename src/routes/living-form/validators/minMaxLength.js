export default (minLength, maxLength) => value => {
  if (value && (value.length < minLength || value.length > maxLength)) {
    return `Der Wert muss zwischen ${minLength} und ${maxLength} Zeichen haben.`
  }
}
