import React, { useState, useEffect } from "react"

const UserProfileContainer = (props) => {
  const [user, setUser] = useState({
    profile_photo: {
      url: null,
    },
  })

  let profilePhoto = user.profile_photo.url

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

      setUser(responseBody)
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  if (user.profile_photo.url === null) {
    profilePhoto =
      "https://foodle-production.s3.amazonaws.com/foodle+transparent.png"
  }

  return (
    <div className="grid-x">
      <ul className="cell small-4 vertical menu">
        <li>
          <a href="#" className="clear button profile-buttons">Profile</a>
        </li>
        <li>
          <a href="/users/edit" className="clear button profile-buttons">Password</a>
        </li>
        <li>
          <a href="#" className="clear button profile-buttons">Liked Restaurants</a>
        </li>
        <li>
          <a href="#" className="clear button profile-buttons">Liked Reviews</a>
        </li>
        <li>
          <a href="#" className="clear button profile-buttons">Posted Reviews</a>
        </li>
      </ul>
      <div className="cell auto">
        <h5>Username: {user.username}</h5>
        <img src={profilePhoto} className="user-profile" />
      </div>
    </div>
  )
}

export default UserProfileContainer