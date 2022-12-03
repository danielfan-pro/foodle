import React, { useState } from "react"

const LikedReview = (props) => {
  // const [likedReview, setLikedReview] = useState("regular")
  const [likeCount, setLikeCount] = useState(props.review.review_likes.length)

  let likedReview = "regular"

  props.review.review_likes.forEach((review_like) => {
    if (review_like.user_id === props.currentUser.id) {
      likedReview = "solid"
    }
  })

  const handleLikeReview = () => {
    if (likedReview === "regular") {
      setLikedReview("solid")
      setLikeCount(likeCount+1)
    } else {
      setLikedReview("regular")
      setLikeCount(likeCount-1)
    }
  }

  return (
    <i className={`fa-${likedReview} fa-heart`} onClick={handleLikeReview}>
      {" "}
      {likeCount}
    </i>
  )
}

export default LikedReview
