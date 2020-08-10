import React, {useState} from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.array.isRequired,
  isViewingSingle: PropTypes.bool.isRequired,
  style: PropTypes.shape().isRequired,
}

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const MapView = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  // TODO: FIX MAP STYLES. REMOVE HORIZONTAL SCROLL
  // FIX INFOVIEW DISPLAY/ CSS
  const { items, isViewingSingle, style } = props;

  const mapCenter = isViewingSingle ? {
    lat: parseFloat(items[0].latitude),
    lng: parseFloat(items[0].longitude)
  } : {
    lat: parseFloat(process.env.REACT_APP_SF_LAT),
    lng: parseFloat(process.env.REACT_APP_SF_LNG)
  };

  const onMarkerClick = (props, marker, e) => {
    console.log(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
    setSelectedPlace(props);
  };

  const onInfoWindowClose = () => {
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };

  const onMapClicked = () => {
    if (showingInfoWindow)
    setActiveMarker(null);
    setShowingInfoWindow(false);
  };


  return (
      <Map 
        google={props.google}
        initialCenter={mapCenter}
        zoom={13}
        style={style}
        onClick={onMapClicked}
      >
        {items.map((item, index) => (
            <Marker
              onClick={onMarkerClick}
              title={item.location}
              name={item.applicant}
              position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}} 
              key={`marker-${index}`}
            />
        ))}
        <InfoWindow 
            key={`info-window`}
            marker={activeMarker}
            onClose={onInfoWindowClose}
            visible={showingInfoWindow}
          >
            <div>
                <h1>{selectedPlace.title}</h1>
                <h3>{selectedPlace.name}</h3>
            </div>
          </InfoWindow>
      </Map>
  );
};

MapView.propTypes = propTypes;
export default GoogleApiWrapper({
    apiKey: API_KEY,
    v: "3.30",
  })(MapView)