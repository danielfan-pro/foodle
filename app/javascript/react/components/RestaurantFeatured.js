import React from "react"
import { Link } from "react-router-dom"
import ConvertRatingToStar from "./ConvertRatingToStar"

const RestaurantFeatured = (props) => {
  let categoriesArray = []
  let categories = ""

  props.restaurantFeatured.categories.forEach((category) => {
    categoriesArray.push(category.title)
    return categoriesArray
  })

  categories = categoriesArray.join(", ")

  return (
    <div className="row restaurant-featured">
      <div className="column">
        <h3 className="featured-recommendation">Featured Recommendation</h3>
        <Link to={`/restaurants/${props.restaurantFeatured.id}`}>
          <h5>{props.restaurantFeatured.name}</h5>
          <div className="restaurant-stars">
            {ConvertRatingToStar.convert(props.restaurantFeatured.rating)}
          </div>

          <div className="price">{props.restaurantFeatured.price}</div>
          <div>
            <p>{categories}</p>
          </div>

          <img
            src={props.restaurantFeatured.image_url}
            className="restaurant-featured-image"
          />
        </Link>
      </div>
    </div>
  )
}

export default RestaurantFeatured
