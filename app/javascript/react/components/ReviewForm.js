import React, { useState } from "react"
import Dropzone from "react-dropzone"
import ErrorList from "./ErrorList"
import { Redirect } from "react-router-dom"

const ReviewForm = (props) => {
  const [errors, setErrors] = useState({})
  const [redirect, setRedirect] = useState(null)
  const [files, setFiles] = useState([])
  const [newReview, setNewReview] = useState({
    title: "",
    description: "",
    rating: "",
    photo: "",
  })

  const restaurantId = props.match.params.id

  const handleFileUpload = (acceptedFiles) => {
    setNewReview({
      ...newReview,
      photo: acceptedFiles[0],
    })

    setFiles([
      ...files,
      <li key={acceptedFiles[0].path}>
        {acceptedFiles[0].path} - {acceptedFiles[0].size} bytes
      </li>,
    ])
  }

  const handleFormChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title", "description", "rating"]
    requiredFields.forEach((field) => {
      if (newReview[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank",
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmitAddNewReview = (event) => {
    event.preventDefault()
    if (validForSubmission()) {
      addNewReview(newReview)
      setNewReview({
        title: "",
        description: "",
        rating: "",
        photo: "",
      })
      setFiles([])
    }
  }

  const addNewReview = async (payLoad) => {
    let body = new FormData()
    body.append("title", payLoad.title)
    body.append("description", payLoad.description)
    body.append("rating", payLoad.rating)
    body.append("yelp_restaurant_id", restaurantId)
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

      if (responseBody.review) {
        setRedirect(responseBody.review.yelp_restaurant_id)
      } else if (responseBody.error[0]) {
        alert("Review was not added successfully")
      }
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  if (redirect !== null) {
    return <Redirect to={`/restaurants/${redirect}`} />
  }

  return (
    <div>
      <h2 className="form-header">Add a review</h2>
      <div className="review-form-div">
        <form onSubmit={handleSubmitAddNewReview} className="new-review">
          <ErrorList errors={errors} />

          <label htmlFor="title">
            Title
            <input
              id="title"
              type="text"
              name="title"
              value={newReview.title}
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
              value={newReview.description}
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="rating">Rating</label>

          <fieldset className="rating">
            <input
              type="radio"
              id="star5"
              name="rating"
              value="5"
              onClick={handleFormChange}
            />
            <label htmlFor="star5"></label>
            <input
              type="radio"
              id="star4"
              name="rating"
              value="4"
              onClick={handleFormChange}
            />
            <label htmlFor="star4"></label>
            <input
              type="radio"
              id="star3"
              name="rating"
              value="3"
              onClick={handleFormChange}
            />
            <label htmlFor="star3"></label>
            <input
              type="radio"
              id="star2"
              name="rating"
              value="2"
              onClick={handleFormChange}
            />
            <label htmlFor="star2"></label>
            <input
              type="radio"
              id="star1"
              name="rating"
              value="1"
              onClick={handleFormChange}
            />
            <label htmlFor="star1"></label>
          </fieldset>

          <div className="drop-zone">
            <Dropzone onDrop={handleFileUpload}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag image here, or click to select image to upload</p>
                  </div>
                </section>
              )}
            </Dropzone>

            <aside>
              <ul>{files}</ul>
            </aside>
          </div>

          <div className="submit-button">
            <button className="button clear write-review">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
