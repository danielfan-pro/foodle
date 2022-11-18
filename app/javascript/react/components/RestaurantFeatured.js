import React from "react"
import { Link } from 'react-router-dom';
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
        <Link to={`/restaurants/${props.restaurantFeatured.id}`}>
          <h5>{props.restaurantFeatured.name}</h5>
          {ConvertRatingToStar.convert(props.restaurantFeatured.rating)}
          <div className="categories-price">
            <div className="price"><p>{props.restaurantFeatured.price}</p></div>
            <div><p>{categories}</p></div>
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
