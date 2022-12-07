import React from "react"

const RecipeShow = (props) => {
  return (
    <div className="cell">
      <div className="restaurant-show-tile">
        <h3 className="recipe-text">{props.recipe.title}</h3>
        <img src={props.recipe.image} className="restaurant-show-image" />

        <p className="recipe-text">
          Ready in {props.recipe.readyInMinutes} minutes
        </p>
        <p className="recipe-text">Serving {props.recipe.servings}</p>
        <div className="callout secondary">
          <div
            className="recipe-text"
            dangerouslySetInnerHTML={{ __html: `${props.recipe.summary}` }}
          />
        </div>
        <a href={`${props.recipe.sourceUrl}`} className="recipe-instruction">
          Click here for the Instructions
        </a>
      </div>
    </div>
  )
}

export default RecipeShow