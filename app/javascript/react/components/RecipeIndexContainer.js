import React, { useState } from "react"
import { Link } from "react-router-dom"
import RecipeSearchBar from "./RecipeSearchBar"
import RecipeFeatured from "./RecipeFeatured"
import RecipeTile from "./RecipeTile"

const RecipeIndexContainer = () => {
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

  return (
    <div>
      <Link to="/recipes">
        <div className={`logo-main ${displayLogo}`}>
          <img
            src="https://foodle-development.s3.amazonaws.com/foodle+transparent.png"
            alt="foodle logo"
            className="logo-main-search"
          />
        </div>
      </Link>
      <h2 className="category-header">Recipes</h2>
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