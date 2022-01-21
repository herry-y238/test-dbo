import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/dashboard'
import Login from './components/Login/login'
import ProtectRoute from './components/ProtectRoute/protectRoute'

function App() {
  return (
    <div className="wrapper">
      <h1>React Test DBO</h1>
      <BrowserRouter>
          <Route exact path="/" component={Login} />
          <ProtectRoute exact path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    </div>
  )
}

export default App;
