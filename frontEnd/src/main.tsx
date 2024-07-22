import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import MetamaskProvider from './utilss/MetamaskProvider.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MetamaskProvider>
    <ToastContainer/>
      <App />
    </MetamaskProvider>
  </React.StrictMode>,
)
