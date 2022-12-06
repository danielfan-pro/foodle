import React from "react"
import { Link } from "react-router-dom"

const RecipeTile = (props) => {
  return (
    <div className="cell medium-6 small-12 large-4">
      <Link to={`/recipes/${props.recipe.id}`}>
        <h6>{props.recipe.title}</h6>
        <img src={props.recipe.image} className="recipe-image" />
      </Link>
    </div>
  )
}

export default RecipeTile