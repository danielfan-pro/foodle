import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import HomePageImages from "./HomePageImages"

const HomePage = () => {
  const [restaurantFeatured, setRestaurantFeatured] = useState({
    name: "",
    image_url: "",
    price: "",
    rating: "",
    categories: [{}],
  })
  const [restaurants, setRestaurants] = useState([])

  const searchParams = {
    location: "new york",
    item: "",
  }

  const getRestaurants = async () => {
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

      setRestaurantFeatured(responseBody.restaurant_featured)
      setRestaurants(responseBody.restaurant_others)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getRestaurants()
  }, [])

  const homePageImages = restaurants.map((restaurant) => {
    return <HomePageImages key={restaurant.id} image={restaurant.image_url} />
  })

  return (
    <div>
      <div className="logo-main">
        <img
          src="https://foodle-development.s3.amazonaws.com/foodle+transparent.png"
          alt="foodle logo"
          className="logo-main-search"
        />
      </div>

      <p className="text-center">Trying to figure out what to eat?</p>
      <Link to="/restaurants">
        <h4 className="text-center click-here">Click here to begin.</h4>
      </Link>
      <div className="grid-x grid-margin-x">
        {restaurantFeatured.name ? (
          <HomePageImages image={restaurantFeatured.image_url} />
        ) : null}
        {homePageImages}
      </div>
    </div>
  )
}

export default HomePage
