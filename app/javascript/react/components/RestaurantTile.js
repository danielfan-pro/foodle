import React from "react"
import ConvertRatingToStar from "./ConvertRatingToStar"

const RestaurantTile = (props) => {
  let categoriesArray = []
  let categories = ""

  props.restaurant.categories.forEach((category) => {
    categoriesArray.push(category.title)
    return categoriesArray
  })

  categories = categoriesArray.join(", ")

  return (
    <div className="cell medium-6 small-12 large-4">
      <h6>{props.restaurant.name}</h6>
      <div className="categories-price">
        {ConvertRatingToStar.convert(props.restaurant.rating)}
        <div className="price">{props.restaurant.price}</div>
      </div>
      <div>{categories}</div>
      <img src={props.restaurant.image_url} className="restaurant-image" />
    </div>
  )
}

export default RestaurantTile
