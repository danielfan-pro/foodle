import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./HomePage"
import RestaurantIndexContainer from "./RestaurantIndexContainer"
import RestaurantShowContainer from "./RestaurantShowContainer"

export const App = () => {
  const [theme, setTheme] = useState("light")
  const [moonStatus, setMoonStatus] = useState("show")
  const [sunStatus, setSunStatus] = useState("hide")

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      setMoonStatus("hide")
      setSunStatus("show")
    } else {
      setTheme("light")
      setMoonStatus("show")
      setSunStatus("hide")
    }
  }



  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`App ${theme}`}>
      <i className={`fa-solid fa-moon dark-mode-toggle ${moonStatus}`} onClick={toggleTheme}></i>
      <i className={`fa-solid fa-sun dark-mode-toggle ${sunStatus}`} onClick={toggleTheme}></i>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/restaurants"
            component={RestaurantIndexContainer}
          />
          <Route
            exact
            path="/restaurants/:id"
            component={RestaurantShowContainer}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
