import React, { useState } from "react"
import Dropzone from "react-dropzone"
import ErrorList from "./ErrorList"

const ReviewForm = (props) => {
  const [errors, setErrors] = useState({})
  const [displayForm, setDisplayForm] = useState("hide")
  const [files, setFiles] = useState([])
  const [newReview, setNewReview] = useState({
    title: "",
    body: "",
    rating: "",
    photo: "",
  })

  const displayReviewForm = () => {
    if (displayForm === "hide") {
      setDisplayForm("show")
    } else {
      setDisplayForm("hide")
    }
  }

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
    const requiredFields = ["title", "body", "rating"]
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
      props.addNewReview(newReview)
      setNewReview({
        title: "",
        body: "",
        rating: "",
        photo: "",
      })
      setDisplayForm("hide")
      setFiles([])
    }
  }

  return (
    <div className="grid-x grid-margin-x">
      <div
        className={`cell review-form-div review-button ${props.reviewButton}`}
      >
        <button
          className="button write-review"
          type="button"
          onClick={displayReviewForm}
        >
          Write Review
        </button>
        <form
          onSubmit={handleSubmitAddNewReview}
          className={`new-review ${displayForm}`}
        >
          <ErrorList errors={errors} />

          <label htmlFor="title">
            Food Name
            <input
              id="title"
              type="text"
              name="title"
              value={newReview.title}
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="body">
            Comment
            <textarea
              id="body"
              rows="4"
              type="text"
              name="body"
              value={newReview.body}
              onChange={handleFormChange}
            />
          </label>

          <label htmlFor="rating">
            Rating
            <input
              id="rating"
              type="number"
              name="rating"
              value={newReview.rating}
              onChange={handleFormChange}
            />
          </label>

          <div className="dropzone">
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
            <button className="button write-review">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
