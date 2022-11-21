import React from "react"

const HomePageImages = (props) => {
  
  return (
    <div className="cell small-12 medium-6 large-3">
      <img className="home-images" src={`${props.image}`} />
    </div>
  )
}

export default HomePageImages
