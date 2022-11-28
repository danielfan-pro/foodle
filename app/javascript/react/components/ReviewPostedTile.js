import React from "react"
import ConvertRatingToStar from "./ConvertRatingToStar"
import ModalImage from "react-modal-image"
import { Link } from "react-router-dom"

const ReviewPostedTile = (props) => {
  return (
    <div>
      <Link to={`/restaurants/${props.review.yelp_restaurant_id}`}>
        <div className="small-12 medium-8 medium-offset-2 large-8 large-offset-2 callout">
          <div className="grid-x">
            <div className="small-8 medium-8 large-8">
              <h5 className="text-left restaurant-name">
                {props.review.yelp_restaurant_name}
              </h5>
              <div className="grid-x">
                <p className="cell small-4 text-left">
                  {props.review.created_at}
                </p>
                <div className="cell small-4 text-right">
                  {ConvertRatingToStar.convert(props.review.rating)}
                </div>
              </div>

              <h6 className="text-left">{props.review.title}</h6>
              <p className="text-left">{props.review.description}</p>
            </div>

            <div className="grid-x small-4">
              <ModalImage
                small={props.review.photo}
                medium={props.review.photo}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ReviewPostedTile
