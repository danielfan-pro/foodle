import React, { useState, useEffect } from "react"
import RestaurantShow from "./RestaurantShow"
import GoogleMapLoader from "./GoogleMapLoader"
import ReviewForm from "./ReviewForm"
import ReviewTile from "./ReviewTile"

const RestaurantShowContainer = (props) => {
  const [restaurant, setRestaurant] = useState({
    categories: [],
    location: {
      display_address: [],
    },
    coordinates: {
      latitude: 42.3601,
      longitude: -71.0589,
    },
  })
  const [reviews, setReviews] = useState([])

  // const [signedIn, setSignedIn] = useState(false)

  const restaurantId = props.match.params.id

  const getRestaurant = async () => {
    try {
      const response = await fetch(`/api/v1/restaurants/${restaurantId}`)

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()

      setRestaurant(responseBody.restaurant)
      setReviews(responseBody.reviews.reviews)

      // if (responseBody.restaurant.current_user !== null) {
      //   setSignedIn(true)
      // }
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  // if (signedIn !== false) {
  //   reviewButton = "show"
  // }

  useEffect(() => {
    getRestaurant()
  }, [])

  const reviewTiles = reviews.map((review) => {
    return (
      <ReviewTile
        key={review.id}
        title={review.title}
        description={review.description}
        rating={review.rating}
        created_at={review.created_at}
        username={review.user.username}
        photo={review.photo}
      />
    )
  })

  const addNewReview = async (payLoad) => {
    let body = new FormData()
    body.append("title", payLoad.title)
    body.append("body", payLoad.body)
    body.append("rating", payLoad.rating)
    body.append("ride_id", rideId)
    body.append("photo", payLoad.photo)

    try {
      const response = await fetch(
        `/api/v1/restaurants/${restaurantId}/reviews`,
        {
          method: "POST",
          credentials: "same-origin",
          body: body,
        }
      )
      if (!response.ok) {
        const newError = new Error(`${response.status} ${response.statusText}`)
        throw newError
      }
      const responseBody = await response.json()
      setReviews([...reviews, responseBody.review])
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  return (
    <div>
      <div className="grid-x grid-margin-x">
        <RestaurantShow restaurant={restaurant} />
        <div className="cell large-4 medium-4 small-12 maps">
          <GoogleMapLoader
            latitude={restaurant.coordinates.latitude}
            longitude={restaurant.coordinates.longitude}
          />
        </div>
      </div>
      <ReviewForm />
      {reviewTiles}
      <div className="extra-padding"></div>
    </div>
  )
}

export default RestaurantShowContainer
