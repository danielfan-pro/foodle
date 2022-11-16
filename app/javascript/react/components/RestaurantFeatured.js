import React from "react"

const RestaurantFeatured = (props) => {
  debugger
  return (
    <div className="restaurant-featured">
      <p>Name: {props.restaurantFeatured.name}</p>
      <img
        src={props.restaurantFeatured.image_url}
        className="restaurant-featured-image"
      />
      <p>Phone: {props.restaurantFeatured.display_phone}</p>
      <p>Price: {props.restaurantFeatured.price}</p>
      <p>Rating: {props.restaurantFeatured.rating}</p>
      <p>Address: {props.restaurantFeatured.location.display_address.join()}</p>
    </div>
  )
}

export default RestaurantFeatured
