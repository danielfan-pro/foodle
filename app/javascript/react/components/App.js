import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./HomePage"
import RestaurantIndexContainer from "./RestaurantIndexContainer"
import RestaurantShowContainer from "./RestaurantShowContainer"
import ReviewForm from "./ReviewForm"
import UserProfileContainer from "./UserProfileContainer"
import RecipeIndexContainer from "./RecipeIndexContainer"
import RecipeShowContainer from "./RecipeShowContainer"

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

  const toggleIcon = (
    <i
      className={`fa-solid fa-${status} dark-mode-toggle`}
      onClick={toggleTheme}
    ></i>
  )

  const toggleSlot = document.getElementById("theme-toggle-slot")

  return (
    <div className={`App ${theme}`}>
      {toggleSlot ? createPortal(toggleIcon, toggleSlot) : toggleIcon}
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
          <Route exact path="/recipes" component={RecipeIndexContainer} />
          <Route exact path="/recipes/:id" component={RecipeShowContainer} />
          <Route exact path="/u/:username" component={UserProfileContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
