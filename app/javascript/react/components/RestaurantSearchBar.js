import React, { useState } from "react"

const RestaurantSearchBar = (props) => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    item: "",
  })

  const [searchButtonHome, setSearchButtonHome] = useState("show")
  const [searchButtonOther, setSearchButtonOther] = useState("hide")

  const handleChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

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

      props.setRestaurantFeatured(responseBody.restaurant_featured)
      props.setRestaurantOthers(responseBody.restaurant_others)
      props.setDisplayLogo("hide")

      setSearchButtonHome("hide")
      setSearchButtonOther("show")
      props.setDisplayError("hide")
      props.setDisplayResult("show")
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
