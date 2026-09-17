import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // dark blue
    },
    secondary: {
      main: '#ff6d00', // accent color
    },
    background: {
      default: '#f5f5f5', // soft gray
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});

export default theme;
