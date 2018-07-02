import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import './index.css';
import App from './App';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#72ACD6',
      main: '#3E8EC7',
      dark: '#4F98CC',
      contrastText: '#F6F6F6',
    },
    secondary: {
      light: '#F07341',
      main: '#EF652F',
      dark: '#DA5C2B',
      contrastText: '#F6F6F6',
    },
  },
});


ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </MuiPickersUtilsProvider>
, document.getElementById('root'));
