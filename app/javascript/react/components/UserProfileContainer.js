import React, { useState, useEffect } from "react"
import UserProfileShow from "./UserProfileShow"
import ReviewPostedTile from "./ReviewPostedTile"

const UserProfileContainer = (props) => {
  const [currentUser, setCurrentUser] = useState({
    user: {
      profile_photo: {
        url: null,
      },
      reviews: [],
    },
  })

  const [profileDisplay, setProfileDisplay] = useState("show")
  const [postedReviewDisplay, setPostedReviewDisplay] = useState("hide")

  let profilePhoto = currentUser.user.profile_photo.url

  const username = props.match.params.username

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${username}`)

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()

      setCurrentUser(responseBody)
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (currentUser.user.profile_photo.url === null) {
    profilePhoto =
      "https://foodle-production.s3.amazonaws.com/foodle+transparent.png"
  }

  const reviewsPosted = currentUser.user.reviews.map((review) => {
    return <ReviewPostedTile key={review.id} review={review} />
  })

  const handleClickProfile = () => {
    setProfileDisplay("show")
    setPostedReviewDisplay("hide")
  }

  const handleClickPostedReviews = () => {
    setProfileDisplay("hide")
    setPostedReviewDisplay("show")
  }

  return (
    <div className="grid-x">
      <ul className="cell small-4 vertical menu">
        <li>
          <a
            href="#"
            className="clear button profile-buttons"
            onClick={handleClickProfile}
          >
            Profile
          </a>
        </li>
        <li>
          <a href="/users/edit" className="clear button profile-buttons">
            Password
          </a>
        </li>
        <li>
          <a href="#" className="clear button profile-buttons">
            Liked Restaurants
          </a>
        </li>
        <li>
          <a href="#" className="clear button profile-buttons">
            Liked Reviews
          </a>
        </li>
        <li>
          <a
            href="#"
            className="clear button profile-buttons"
            onClick={handleClickPostedReviews}
          >
            Posted Reviews
          </a>
        </li>
      </ul>
      <div className="cell auto">
        <div className="extra-padding"></div>
        <div className={`${profileDisplay}`}>
          <UserProfileShow
            profilePhoto={profilePhoto}
            username={currentUser.user.username}
          />
        </div>
        <div className={`${postedReviewDisplay}`}>{reviewsPosted}</div>
      </div>
    </div>
  )
}

export default UserProfileContainer
