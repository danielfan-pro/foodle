import React from "react"
import { Link } from "react-router-dom"

const recipeFeatured = (props) => {
  return (
    <div className="row restaurant-featured">
      <div className="column">
        <h3 className="featured-recommendation">Featured Recommendation</h3>
        <Link to={`/recipes/${props.recipeFeatured.id}`}>
          <h5>{props.recipeFeatured.title}</h5>
          <img
            src={props.recipeFeatured.image}
            className="restaurant-featured-image"
          />
        </Link>
      </div>
    </div>
  )
}

export default recipeFeatured