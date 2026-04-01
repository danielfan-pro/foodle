import React, { useState } from "react"

const RECIPE_SEARCH_CACHE_KEY = "recipeSearchCache"

const RecipeSearchBar = (props) => {
  const shouldReset =
    new URLSearchParams(window.location.search).get("reset") === "1"

  const [searchParams, setSearchParams] = useState(() => {
    if (shouldReset) {
      return {
        item: "",
      }
    }

    const cachedSearchRaw = sessionStorage.getItem(RECIPE_SEARCH_CACHE_KEY)

    if (cachedSearchRaw) {
      try {
        const cachedSearch = JSON.parse(cachedSearchRaw)
        return {
          item: cachedSearch?.searchParams?.item || "",
        }
      } catch (_error) {
        sessionStorage.removeItem(RECIPE_SEARCH_CACHE_KEY)
      }
    }

    return {
      item: "",
    }
  })

  const hasCachedSearchState = (() => {
    if (shouldReset) {
      return false
    }
    const cachedSearchRaw = sessionStorage.getItem(RECIPE_SEARCH_CACHE_KEY)
    if (!cachedSearchRaw) {
      return false
    }
    try {
      JSON.parse(cachedSearchRaw)
      return true
    } catch (_error) {
      return false
    }
  })()

  const [searchButtonHome, setSearchButtonHome] = useState(
    hasCachedSearchState ? "hide" : "show"
  )
  const [searchButtonOther, setSearchButtonOther] = useState(
    hasCachedSearchState ? "show" : "hide"
  )

  const handleChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/v1/recipes/search", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(searchParams),
      })

      if (!response.ok) {
        if (response.status === 404) {
          props.setErrors(
            "Sorry, but we couldn't find anything based on the information you entered. Please try again."
          )
          props.setDisplayError("show")
          props.setDisplayResult("hide")
        }
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()

      props.setRecipeFeatured(responseBody.recipe_featured)
      props.setRecipeOthers(responseBody.recipe_others)
      props.setDisplayLogo("hide")
      setSearchButtonHome("hide")
      setSearchButtonOther("show")
      props.setDisplayResult("show")

      sessionStorage.setItem(
        RECIPE_SEARCH_CACHE_KEY,
        JSON.stringify({
          searchParams,
          recipe_featured: responseBody.recipe_featured,
          recipe_others: responseBody.recipe_others,
        })
      )
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="item"
            value={searchParams.item}
            onChange={handleChange}
            placeholder="category (pizza, pasta, etc)"
            className="input-group-field"
          />

          <div className={`input-group-button ${searchButtonOther}`}>
            <input type="submit" value="Search" className="button clear" />
          </div>
        </div>

        <input
          type="submit"
          value="Search"
          className={`button clear search-button ${searchButtonHome}`}
        />
      </form>
    </div>
  )
}

export default RecipeSearchBar
