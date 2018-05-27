export default minimum => value => {
  if (!(value >= minimum)) {
    return `Der Wert muss mindestens ${minimum} sein.`
  }
}
