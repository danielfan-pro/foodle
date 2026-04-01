import React from "react"

const GoogleMapLoader = (props) => {
  const latitude = props.latitude
  const longitude = props.longitude
  const hasCoordinates = latitude !== undefined && longitude !== undefined

  if (!hasCoordinates) {
    return <p>Map unavailable for this restaurant.</p>
  }

  const query = `${latitude},${longitude}`
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`
  const embedLink = `https://maps.google.com/maps?q=${query}&z=15&output=embed`

  return (
    <div>
      <iframe
        title="Restaurant location map"
        src={embedLink}
        width="100%"
        height="192"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a href={mapsLink} target="_blank" rel="noopener noreferrer">
        Open in Google Maps
      </a>
    </div>
  )
}

export default GoogleMapLoader
