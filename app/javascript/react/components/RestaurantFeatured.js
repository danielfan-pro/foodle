import React from "react"
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
        <h5>{props.restaurantFeatured.name}</h5>
        {ConvertRatingToStar.convert(props.restaurantFeatured.rating)}
        <div className="categories-price">
          <div className="price">{props.restaurantFeatured.price}</div>
          <div>{categories}</div>
        </div>
        <img
          src={props.restaurantFeatured.image_url}
          className="restaurant-featured-image"
        />
      </div>
    </div>
  )
}

export default RestaurantFeatured
