import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '40vh',
  margin: '0.1rem 0'
};

export default function Maps(props) {
  return (
    <LoadScript
      googleMapsApiKey={process.env.GOOGLEMAPS_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.coordinates}
        zoom={15}
        >
          <>
            <Marker position={props.coordinates}/>
          </>
        </GoogleMap>
    </LoadScript>
  );
}
