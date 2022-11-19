import React, { useState } from "react"
import { Link } from "react-router-dom"
import RestaurantSearchBar from "./RestaurantSearchBar"
import RestaurantFeatured from "./RestaurantFeatured"
import RestaurantTile from "./RestaurantTile"

const RestaurantIndexContainer = () => {
  const [restaurantFeatured, setRestaurantFeatured] = useState({
    name: "",
    image_url: "",
    price: "",
    rating: "",
    categories: [{}],
  })
  const [restaurantOthers, setRestaurantOthers] = useState([])
  const [displayLogo, setDisplayLogo] = useState("show")

  const restaurantTiles = restaurantOthers.map((restaurant) => {
    return <RestaurantTile key={restaurant.id} restaurant={restaurant} />
  })

  return (
    <div>
      <Link to="/restaurants">
        <div className={`logo-main ${displayLogo}`}>
          <img
            src="https://foodle-development.s3.amazonaws.com/foodle+transparent.png"
            alt="foodle logo"
            className="logo-main-search"
          />
        </div>
      </Link>
      <RestaurantSearchBar
        setRestaurantFeatured={setRestaurantFeatured}
        setRestaurantOthers={setRestaurantOthers}
        setDisplayLogo={setDisplayLogo}
      />
      {restaurantFeatured.name ? (
        <RestaurantFeatured restaurantFeatured={restaurantFeatured} />
      ) : null}
      <div className="grid-x grid-margin-x">{restaurantTiles}</div>
    </div>
  )
}

export default RestaurantIndexContainer
