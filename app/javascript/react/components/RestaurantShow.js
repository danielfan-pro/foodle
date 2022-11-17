import React from "react"
import ConvertRatingToStar from "./ConvertRatingToStar"

const RestaurantShow = (props) => {
  let categoriesArray = []
  let categories = ""

  props.restaurant.categories.forEach((category) => {
    categoriesArray.push(category.title)
    return categoriesArray
  })

  categories = categoriesArray.join(", ")

  return (
    <div className="cell small-12 medium-8 large-8">
      <h3>{props.restaurant.name}</h3>
      {ConvertRatingToStar.convert(props.restaurant.rating)}
      <div className="price">{props.restaurant.price}</div>
      <div>
        <p>{categories}</p>
      </div>
      <div>
        <p>{props.restaurant.display_phone}</p>
      </div>
      <div>
        <p>{props.restaurant.location.display_address.join()}</p>
      </div>
      <img src={props.restaurant.image_url} className="restaurant-show-image" />
    </div>
  )
}

export default RestaurantShow
