export default value => {
  if (!Number.isInteger(Number.parseFloat(value))) {
    return `Der Wert muss ganzzahlig sein.`
  }
}
