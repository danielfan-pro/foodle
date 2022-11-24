import React, { useState, useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./HomePage"
import RestaurantIndexContainer from "./RestaurantIndexContainer"
import RestaurantShowContainer from "./RestaurantShowContainer"
import ReviewForm from "./ReviewForm"
import UserProfileContainer from "./UserProfileContainer"

export const App = () => {
  const [theme, setTheme] = useState("light")
  const [status, setStatus] = useState("moon")

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      setStatus("sun")
    } else {
      setTheme("light")
      setStatus("moon")
    }
  }

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`App ${theme}`}>
      <i
        className={`fa-solid fa-${status} dark-mode-toggle`}
        onClick={toggleTheme}
      ></i>
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
            path="/restaurants/:id/reviews/new"
            component={ReviewForm}
          />
          <Route
            exact
            path="/restaurants/:id"
            component={RestaurantShowContainer}
          />
          <Route exact path="/u/:username" component={UserProfileContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
