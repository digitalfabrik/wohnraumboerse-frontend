export default maxLength => value => {
  if (value && value.length > maxLength) {
    return `Der Wert darf höchstens ${maxLength} Zeichen haben.`
  }
}
