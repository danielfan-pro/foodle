import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div>
      <Link to="/restaurants">
        <div className="logo-main">
          <img
            src="https://foodle-development.s3.amazonaws.com/foodle+logo+long.png"
            alt="foodle logo"
            className="logo-main-search"
          />
        </div>
      </Link>
      <p className="text-center">Trying to figure out what to eat? Foodle will help you out! Simply enter your location and foodle will recommend the best place to eat!</p>
      <p className="text-center">Click the logo to begin.</p>
    </div>
  )
}

export default HomePage
