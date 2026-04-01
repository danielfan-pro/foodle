import React, { useState } from "react"

const RESTAURANT_SEARCH_CACHE_KEY = "restaurantSearchCache"

const RestaurantSearchBar = (props) => {
  const shouldReset =
    new URLSearchParams(window.location.search).get("reset") === "1"

  const [searchParams, setSearchParams] = useState(() => {
    if (shouldReset) {
      return {
        location: "",
        item: "",
      }
    }

    const cachedSearchRaw = sessionStorage.getItem(RESTAURANT_SEARCH_CACHE_KEY)

    if (cachedSearchRaw) {
      try {
        const cachedSearch = JSON.parse(cachedSearchRaw)
        return {
          location: cachedSearch?.searchParams?.location || "",
          item: cachedSearch?.searchParams?.item || "",
        }
      } catch (_error) {
        sessionStorage.removeItem(RESTAURANT_SEARCH_CACHE_KEY)
      }
    }

    return {
      location: "",
      item: "",
    }
  })

  const hasCachedSearchState = (() => {
    if (shouldReset) {
      return false
    }
    const cachedSearchRaw = sessionStorage.getItem(RESTAURANT_SEARCH_CACHE_KEY)
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

    if (!searchParams.location.trim()) {
      props.setErrors("Please enter a location.")
      props.setDisplayError("show")
      props.setDisplayResult("hide")
      return
    }

    try {
      const response = await fetch("/api/v1/restaurants/search", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(searchParams),
      })

      if (!response.ok) {
        let responseBody = null
        try {
          responseBody = await response.json()
        } catch (parseError) {
          responseBody = null
        }

        if (response.status === 404) {
          props.setErrors(
            "Sorry, but we couldn't find anything based on the information you entered. Please try again."
          )
        } else {
          props.setErrors(
            responseBody?.error ||
              "Restaurant search is temporarily unavailable. Please try again later."
          )
        }

        props.setDisplayError("show")
        props.setDisplayResult("hide")
        return
      }
      const responseBody = await response.json()

      props.setRestaurantFeatured(responseBody.restaurant_featured)
      props.setRestaurantOthers(responseBody.restaurant_others)
      props.setDisplayLogo("hide")

      setSearchButtonHome("hide")
      setSearchButtonOther("show")
      props.setDisplayError("hide")
      props.setDisplayResult("show")

      sessionStorage.setItem(
        RESTAURANT_SEARCH_CACHE_KEY,
        JSON.stringify({
          searchParams,
          restaurant_featured: responseBody.restaurant_featured,
          restaurant_others: responseBody.restaurant_others,
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
            name="location"
            value={searchParams.location}
            onChange={handleChange}
            placeholder="address, city, state or zip"
            className="input-group-field"
          />
          <input
            type="text"
            name="item"
            value={searchParams.item}
            onChange={handleChange}
            placeholder="category (pizza, sandwich, etc)"
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

      <h3 className={`search-error ${props.displayError}`}>{props.errors}</h3>
    </div>
  )
}

export default RestaurantSearchBar
