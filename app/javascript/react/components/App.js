import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./HomePage"
import RestaurantIndexContainer from "./RestaurantIndexContainer"
import RestaurantShowContainer from "./RestaurantShowContainer"
import GoogleMapLoader from "./GoogleMapLoader"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/restaurants" component={RestaurantIndexContainer} />
        <Route exact path="/restaurants/:id" component={RestaurantShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
