import React from "react"
import ConvertRatingToStar from "./ConvertRatingToStar"
import ModalImage from "react-modal-image"

const ReviewTile = (props) => {
  const handleEditReview = () => {
    props.setSelectedReviewId(props.review.id)
  }

  const handleDeleteReview = (event) => {
    event.preventDefault()
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview(props.review)
    }
  }

  const deleteReview = async (payLoad) => {
    try {
      const response = await fetch(`/api/v1/reviews/${props.review.id}`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payLoad),
      })
      if (!response.ok) {
        const newError = new Error(`${response.status} ${response.statusText}`)
        throw newError
      }
      const responseBody = await response.json()

      if (responseBody.delete) {
        window.location.reload()
      } else if (responseBody.error[0]) {
        alert("Review was not deleted successfully")
      }
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  return (
    <div className="grid-x grid-margin-x">
      <div className="small-12 medium-8 medium-offset-2 large-8 large-offset-2 callout">
        <div className="grid-x">
          <div className="small-8 medium-8 large-8">
            <div className="grid-x">
              <p className="cell small-4 text-left username">
                {props.review.user.username}
              </p>
              <p className="cell small-4 text-left">
                {props.review.created_at}
              </p>
              <div className="cell small-4 text-left">
                {ConvertRatingToStar.convert(props.review.rating)}
              </div>
            </div>

            <h6>{props.review.title}</h6>
            <p>{props.review.description}</p>

            <div className={props.review.display_action_buttons}>
              <button
                className="button hollow review-action"
                onClick={handleEditReview}
              >
                Edit
              </button>
              <button
                className="button hollow review-action"
                onClick={handleDeleteReview}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid-x small-4">
            <ModalImage
              small={props.review.photo}
              medium={props.review.photo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTile
