import React, { useState, useEffect } from "react"
import RecipeShow from "./RecipeShow"

const RecipeShowContainer = (props) => {
  const [recipe, setRecipe] = useState({
    title: "",
    readyInMinutes: "",
    servings: "",
    image: "",
    sourceUrl: "",
    summary: "",
  })

  const recipeId = props.match.params.id

  const getRecipe = async () => {
    try {
      const response = await fetch(`/api/v1/recipes/${recipeId}`)

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()

      setRecipe(responseBody.recipe)
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getRecipe()
  }, [])

  return (
    <div>
      <RecipeShow recipe={recipe} />
    </div>
  )
}

export default RecipeShowContainer