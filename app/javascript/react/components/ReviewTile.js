import React from "react"
import ConvertRatingToStar from "./ConvertRatingToStar"

const ReviewTile = (props) => {
  let reviewPhoto

  if (props.photo !== null) {
    reviewPhoto = (
      <a href={props.photo} target="_blank">
        <img src={props.photo} className="review-photo" />
      </a>
    )
  }

  return (
    <div className="grid-x grid-margin-x">
      <div className="small-12 medium-8 medium-offset-2 large-8 large-offset-2 callout">
        <div className="grid-x">
          <div className="small-8 medium-8 large-8">
            <div className="grid-x">
              <p className="cell small-4 text-left username">
                {props.username}
              </p>
              <p className="cell small-4 text-left">{props.created_at}</p>
              <div className="cell small-4 text-left">
                {ConvertRatingToStar.convert(props.rating)}
              </div>
            </div>

            <h6>{props.title}</h6>
            <p>{props.description}</p>
          </div>

          <div className="grid-x small-4">{reviewPhoto}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTile
