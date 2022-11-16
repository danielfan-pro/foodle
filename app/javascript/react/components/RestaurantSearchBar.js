import React, { useState } from "react"

const RestaurantSearchBar = (props) => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    item: "",
  })
  

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
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      
      props.setRestaurantFeatured(responseBody.restaurant_featured)
      props.setRestaurantOthers(responseBody.restaurant_others)
      props.setDisplayLogo("hide")

    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  return (
    <div className="search-bar" >
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
            placeholder="chinese, burger, coffee"
            className="input-group-field"
          />

          <div className="input-group-button">
            <input type="submit" value="Search" className="button clear"/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RestaurantSearchBar
