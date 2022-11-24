import React, { useState, useEffect } from "react"
import RestaurantShow from "./RestaurantShow"
import GoogleMapLoader from "./GoogleMapLoader"
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

  const [signedIn, setSignedIn] = useState(false)

  const restaurantId = props.match.params.id

  let reviewText = "show"
  let reviewButton = "hide"

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

      if (responseBody.current_user !== null) {
        setSignedIn(true)
      }
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  if (signedIn !== false) {
    reviewButton = "show"
    reviewText = "hide"
  }

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
        displayActionButtons={review.display_action_buttons}
      />
    )
  })

  return (
    <div>
      <div className="grid-x grid-margin-x">
        <RestaurantShow restaurant={restaurant} />
        <div className="cell">
          <div className="maps">
            <GoogleMapLoader
              latitude={restaurant.coordinates.latitude}
              longitude={restaurant.coordinates.longitude}
            />
          </div>
          <div className={`${reviewText}`}>
            <p className="review-text-long">
              Recommend the best food to others by leaving a review.
            </p>
            <p className="review-text">
              Click <a href="/users/sign_in">Sign In</a> to begin.
            </p>
          </div>
          <a href={`/restaurants/${restaurantId}/reviews/new`}>
            <button className={`button clear ${reviewButton} write-review`}>
              Write Review
            </button>
          </a>
        </div>
      </div>
      {reviewTiles}
      <div className="extra-padding"></div>
    </div>
  )
}

export default RestaurantShowContainer
