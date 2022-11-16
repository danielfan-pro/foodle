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
  const [displayLogo, setDisplayLogo] = useState("show")

  // const restaurantTiles = restaurantOthers.map((restaurant) => {
  //   <RestaurantTile

  //   />

  // })

  // }


  return (
    <div>
      <Link to="/">
        <div className={`logo-main ${displayLogo}`}>
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
        setDisplayLogo={setDisplayLogo}
      />
      <RestaurantFeatured
        restaurantFeatured={restaurantFeatured}  
      />
      {/* {restaurantTiles} */}
    </div>
  )
}

export default RestaurantIndexContainer
