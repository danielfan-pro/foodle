import React, { useState } from "react"
import { Link } from "react-router-dom"
import RestaurantSearchBar from "./RestaurantSearchBar"
import RestaurantFeatured from "./RestaurantFeatured"
import RestaurantTile from "./RestaurantTile"
import foodleTransparentLogo from "../../../assets/images/foodle transparent.png"

const RESTAURANT_SEARCH_CACHE_KEY = "restaurantSearchCache"

const RestaurantIndexContainer = () => {
  const shouldReset =
    new URLSearchParams(window.location.search).get("reset") === "1"
  const [restaurantFeatured, setRestaurantFeatured] = useState({
    name: "",
    image_url: "",
    price: "",
    rating: "",
    categories: [{}],
  })
  const [restaurantOthers, setRestaurantOthers] = useState([])
  const [displayLogo, setDisplayLogo] = useState("show")
  const [errors, setErrors] = useState("")
  const [displayError, setDisplayError] = useState("hide")
  const [displayResult, setDisplayResult] = useState("hide")

  const restaurantTiles = restaurantOthers.map((restaurant) => {
    return <RestaurantTile key={restaurant.id} restaurant={restaurant} />
  })

  React.useEffect(() => {
    if (shouldReset) {
      sessionStorage.removeItem(RESTAURANT_SEARCH_CACHE_KEY)
      window.history.replaceState({}, "", window.location.pathname)
      return
    }

    const cachedSearchRaw = sessionStorage.getItem(RESTAURANT_SEARCH_CACHE_KEY)
    if (!cachedSearchRaw) {
      return
    }

    try {
      const cachedSearch = JSON.parse(cachedSearchRaw)
      const featured = cachedSearch?.restaurant_featured
      const others = cachedSearch?.restaurant_others

      if (featured && Array.isArray(others)) {
        setRestaurantFeatured(featured)
        setRestaurantOthers(others)
        setDisplayLogo("hide")
        setDisplayResult("show")
        setDisplayError("hide")
      }
    } catch (_error) {
      sessionStorage.removeItem(RESTAURANT_SEARCH_CACHE_KEY)
    }
  }, [shouldReset])

  return (
    <div>
      <Link to="/restaurants">
        <div className={`logo-main ${displayLogo}`}>
          <img
            src={foodleTransparentLogo}
            alt="foodle logo"
            className="logo-main-search"
          />
        </div>
      </Link>
      <h2 className={`category-header ${displayLogo}`}>Restaurants</h2>
      <RestaurantSearchBar
        setRestaurantFeatured={setRestaurantFeatured}
        setRestaurantOthers={setRestaurantOthers}
        setDisplayLogo={setDisplayLogo}
        errors={errors}
        setErrors={setErrors}
        displayError={displayError}
        setDisplayError={setDisplayError}
        setDisplayResult={setDisplayResult}
      />

      <div className={`${displayResult}`}>
        {restaurantFeatured.name ? (
          <RestaurantFeatured restaurantFeatured={restaurantFeatured} />
        ) : null}
        <div className="alternative-recommendations">
          {restaurantFeatured.name ? (
            <h4 className="alternative-recommendations">
              Alternative Recommendations
            </h4>
          ) : null}
        </div>
        <div className="grid-x grid-margin-x">{restaurantTiles}</div>
        <div className="extra-padding"></div>
      </div>
    </div>
  )
}

export default RestaurantIndexContainer
