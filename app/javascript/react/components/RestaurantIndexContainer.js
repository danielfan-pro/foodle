import React, {useState} from "react"
import { Link } from "react-router-dom"
import RestaurantSearchBar from "./RestaurantSearchBar"
import RestaurantFeatured from "./RestaurantFeatured"
import RestaurantTile from "./RestaurantTile"

const RestaurantIndexContainer = () => {
  const [restaurantFeatured, setRestaurantFeatured] = useState({
    name: "",
    image_url: "",
    display_phone: "",
    price: "",
    rating: "",
    location: {
      display_address: []
    }
  })
  const [restaurantOthers, setRestaurantOthers] = useState([])

  // const restaurantTiles = restaurantOthers.map((restaurant) => {
  //   <RestaurantTile

  //   />

  // })

  // }


  return (
    <div>
      <Link to="/">
        <div className="logo-main">
          <img
            src="https://foodle-development.s3.amazonaws.com/foodle+logo+long.png"
            alt="foodle logo"
            className="logo-main-search"
          />
        </div>
      </Link>
      <RestaurantSearchBar
        setRestaurantFeatured={setRestaurantFeatured}
        setRestaurantOthers={setRestaurantOthers}
      />
      <RestaurantFeatured
        restaurantFeatured={restaurantFeatured}  
      />
      {/* {restaurantTiles} */}
    </div>
  )
}

export default RestaurantIndexContainer
