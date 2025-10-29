import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import './index.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4CAF50' },
    background: { default: '#121212', paper: '#1e1e1e' },
  },
  typography: {
    fontFamily: '"Raleway", sans-serif',
    h1: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Raleway", sans-serif',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </ThemeProvider>
  </React.StrictMode>,
);