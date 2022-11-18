import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const GoogleMapLoader = (props) => {
  const containerStyle = {
    width: "15.6rem",
    height: "15.6rem",
  }

  const center = {
    lat: props.latitude,
    lng: props.longitude,
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyDTLEaykBrmhn3ew3K-p_CGlD2s3eWtZpM">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapLoader
