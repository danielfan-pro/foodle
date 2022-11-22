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
    <div className="cell">
      <div className="restaurant-show-tile">
        <h3>{props.restaurant.name}</h3>
        <div className="restaurant-stars">
          {ConvertRatingToStar.convert(props.restaurant.rating)}
        </div>
        <div className="price">{props.restaurant.price}</div>
        <div>
          <p>{categories}</p>
        </div>
        <div>
          <p>{props.restaurant.display_phone}</p>
        </div>
        <img
          src={props.restaurant.image_url}
          className="restaurant-show-image"
        />
        <div className="restaurant-address">
          <p>{props.restaurant.location.display_address.join()}</p>
        </div>
      </div>
    </div>
  )
}

export default RestaurantShow
