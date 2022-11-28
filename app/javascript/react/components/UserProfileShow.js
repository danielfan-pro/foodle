import React from "react"

const UserProfileShow = (props) => {
  return (
    <div>
      <h5>{props.username}</h5>
      <img src={props.profilePhoto} className="user-profile" />
    </div>
  )
}

export default UserProfileShow