import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';

ReactDOM.render(
  <MuiThemeProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </MuiThemeProvider>    
, document.getElementById('root'));
