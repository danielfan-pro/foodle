import React, { useState } from "react"
import ErrorList from "./ErrorList"

const ReviewEditForm = (props) => {
  const [errors, setErrors] = useState({})
  const [currentReview, setCurrentReview] = useState(props.review)

  let selected = props.review.rating

  const handleFormChange = (event) => {
    setCurrentReview({
      ...currentReview,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title", "description", "rating"]
    requiredFields.forEach((field) => {
      if (currentReview[field].toString().trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank",
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleUpdateReview = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      updateReview(currentReview)
    }
  }

  const updateReview = async (payLoad) => {
    try {
      const response = await fetch(`/api/v1/reviews/${props.review.id}`, {
        method: "PATCH",
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

      if (responseBody.review) {
        window.location.reload()
      } else if (responseBody.error[0]) {
        alert("Review was not updated successfully")
      }
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  return (
    <div>
      <h5 className="edit-review-header">Edit review</h5>
      <div className="grid-x grid-margin-x">
        <div className="small-12 medium-8 medium-offset-2 large-8 large-offset-2 callout">
          <form className="new-review" onSubmit={handleUpdateReview}>
            <ErrorList errors={errors} />
            <label htmlFor="title">
              Title
              <input
                id="title"
                type="text"
                name="title"
                value={currentReview.title}
                onChange={handleFormChange}
              />
            </label>

            <label htmlFor="description">
              Description
              <textarea
                id="description"
                rows="4"
                type="text"
                name="description"
                value={currentReview.description}
                onChange={handleFormChange}
              />
            </label>

            <label htmlFor="rating">Rating</label>

            <fieldset className="rating" id="edit-rating">
              <input
                type="radio"
                id="star5"
                name="rating"
                value="5"
                onClick={handleFormChange}
                defaultChecked={selected === 5}
              />
              <label htmlFor="star5"></label>
              <input
                type="radio"
                id="star4"
                name="rating"
                value="4"
                onClick={handleFormChange}
                defaultChecked={selected === 4}
              />
              <label htmlFor="star4"></label>
              <input
                type="radio"
                id="star3"
                name="rating"
                value="3"
                onClick={handleFormChange}
                defaultChecked={selected === 3}
              />
              <label htmlFor="star3"></label>
              <input
                type="radio"
                id="star2"
                name="rating"
                value="2"
                onClick={handleFormChange}
                defaultChecked={selected === 2}
              />
              <label htmlFor="star2"></label>
              <input
                type="radio"
                id="star1"
                name="rating"
                value="1"
                onClick={handleFormChange}
                defaultChecked={selected === 1}
              />
              <label htmlFor="star1"></label>
            </fieldset>

            <div className="submit-button">
              <button className="button clear write-review">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReviewEditForm
