import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./HomePage"
import RestaurantIndexContainer from "./RestaurantIndexContainer"
import RestaurantShowContainer from "./RestaurantShowContainer"

export const App = () => {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`App ${theme}`}>
      <i className="fa-solid fa-sun dark-mode-toggle" onClick={toggleTheme}></i>
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
