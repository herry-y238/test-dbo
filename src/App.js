import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard/dashboard'
import Order from './components/Order/order'
import Login from './components/Login/login'
import ProtectRoute from './components/ProtectRoute/protectRoute'

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
          <Route exact path="/" component={Login} />
          <ProtectRoute exact path="/dashboard" component={Dashboard} />
          <ProtectRoute exact path="/order" component={Order} />
      </BrowserRouter>
    </div>
  )
}

export default App;
