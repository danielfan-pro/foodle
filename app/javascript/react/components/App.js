import React from 'react'
import HomePage from './HomePage'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </BrowserRouter>
    )
}

export default App
