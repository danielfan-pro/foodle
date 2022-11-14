import React, { useState } from "react"

const HomePageSearchBar = () => {
  const [searchParams, setSearchParams] = useState({
    item: "",
    location: "",
  })

  const handleChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

  }

  return (
    <form class="home-page-search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="item"
        value={searchParams.item}
        onChange={handleChange}
        placeholder="chinese, burger, Starbucks, or leave it blank"
      />
      <input
        type="text"
        name="location"
        value={searchParams.location}
        onChange={handleChange}
        placeholder="address, city, state or zip"
      />

      <input type="submit" value="Search" />
    </form>
  )
}

export default HomePageSearchBar
