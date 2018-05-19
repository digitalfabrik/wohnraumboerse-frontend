import { createMuiTheme } from '@material-ui/core'

const colorPalette = {
  light: '#819ca9',
  main: '#546e7a',
  dark: '#29434e'
}

export default createMuiTheme({
  palette: {
    primary: colorPalette,
    secondary: colorPalette
  }
})
