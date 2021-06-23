import React from 'react';
import Routes from './routes';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, green } from '@material-ui/core/colors';


function App() {

  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 762,
        lg: 1024,
        xl: 1280,
      },
    },
    typography: {
      fontSize: 16
    },
    palette: {
      primary: blue,
      secondary: green
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
