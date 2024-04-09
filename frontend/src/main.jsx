import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthContexProvider from './Context/AuthContexProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<AuthContexProvider><BrowserRouter><App/></BrowserRouter></AuthContexProvider>)
