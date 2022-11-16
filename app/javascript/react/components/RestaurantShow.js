import React from "react"

const RestaurantShow = (props) => {
  return (
    <div>
      <h1>{props.restaurant.name}</h1>
      <img src={props.restaurant.image_url} />
    </div>
  )
}

export default RestaurantShow
