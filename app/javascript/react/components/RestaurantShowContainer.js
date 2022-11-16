import React, { useState, useEffect } from "react"
import RestaurantShow from "./RestaurantShow"

const RestaurantShowContainer = (props) => {
  const [restaurant, setRestaurant] = useState({
    categories: [],
    location: {
      display_address: []
    }
  })

  const restaurantId = props.match.params.id
  
  const getRestaurant = async () => {
    try {
      const response = await fetch(
        `/api/v1/restaurants/${restaurantId}`
        )
        
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      
      setRestaurant(responseBody.restaurant)

    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  return (
    <div>
      <RestaurantShow restaurant={restaurant} />
    </div>
  )
}

export default RestaurantShowContainer
