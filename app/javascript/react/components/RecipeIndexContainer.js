import React, { useState } from "react"
import { Link } from "react-router-dom"
import RecipeSearchBar from "./RecipeSearchBar"
import RecipeFeatured from "./RecipeFeatured"
import RecipeTile from "./RecipeTile"
import foodleTransparentLogo from "../../../assets/images/foodle transparent.png"

const RECIPE_SEARCH_CACHE_KEY = "recipeSearchCache"

const RecipeIndexContainer = () => {
  const shouldReset =
    new URLSearchParams(window.location.search).get("reset") === "1"
  const [displayLogo, setDisplayLogo] = useState("show")
  const [recipeFeatured, setRecipeFeatured] = useState({
    title: "",
    image: "",
  })
  const [recipeOthers, setRecipeOthers] = useState([])
  const [displayResult, setDisplayResult] = useState("hide")

  const recipeTiles = recipeOthers.map((recipe) => {
    return <RecipeTile key={recipe.id} recipe={recipe} />
  })

  React.useEffect(() => {
    if (shouldReset) {
      sessionStorage.removeItem(RECIPE_SEARCH_CACHE_KEY)
      window.history.replaceState({}, "", window.location.pathname)
      return
    }

    const cachedSearchRaw = sessionStorage.getItem(RECIPE_SEARCH_CACHE_KEY)
    if (!cachedSearchRaw) {
      return
    }

    try {
      const cachedSearch = JSON.parse(cachedSearchRaw)
      const featured = cachedSearch?.recipe_featured
      const others = cachedSearch?.recipe_others

      if (featured && Array.isArray(others)) {
        setRecipeFeatured(featured)
        setRecipeOthers(others)
        setDisplayLogo("hide")
        setDisplayResult("show")
      }
    } catch (_error) {
      sessionStorage.removeItem(RECIPE_SEARCH_CACHE_KEY)
    }
  }, [shouldReset])

  return (
    <div>
      <Link to="/recipes">
        <div className={`logo-main ${displayLogo}`}>
          <img
            src={foodleTransparentLogo}
            alt="foodle logo"
            className="logo-main-search"
          />
        </div>
      </Link>
      <h2 className={`category-header ${displayLogo}`}>Recipes</h2>
      <RecipeSearchBar
        setRecipeFeatured={setRecipeFeatured}
        setRecipeOthers={setRecipeOthers}
        setDisplayLogo={setDisplayLogo}
        setDisplayResult={setDisplayResult}
      />

      <div className={`${displayResult}`}>
        {recipeFeatured.title ? (
          <RecipeFeatured recipeFeatured={recipeFeatured} />
        ) : null}
        <div className="alternative-recommendations">
          {recipeFeatured.title ? (
            <h4 className="alternative-recommendations">
              Alternative Recommendations
            </h4>
          ) : null}
        </div>
        <div className="grid-x grid-margin-x">{recipeTiles}</div>
        <div className="extra-padding"></div>
      </div>
    </div>
  )
}
export default RecipeIndexContainer
