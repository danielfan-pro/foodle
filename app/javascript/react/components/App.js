import React from "react"
import HomePage from "./HomePage"
import RestaurantIndexContainer from "./RestaurantIndexContainer"
import { BrowserRouter, Route, Switch } from "react-router-dom"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/restaurants" component={RestaurantIndexContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
