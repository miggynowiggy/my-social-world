import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#084B83'
    },
    secondary: {
      main: '#42BFDD'
    },
    info: {
      main: '#FF66B3'
    }
  },
  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif'
  }
})

export default theme