import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import FoodTruckIcon from './FoodTruckIcon';

const propTypes = {
  items: PropTypes.array.isRequired,
}

const MapView = (props) => {
  const { items } = props;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
          defaultCenter={{lat: parseFloat(process.env.REACT_APP_SF_LAT), lng: parseFloat(process.env.REACT_APP_SF_LNG)}}
          defaultZoom={15}
        >
          {items.map((item, index) => (
            <FoodTruckIcon
              lat={item.latitude}
              lng={item.longitude}
              text={item.location}
              key={index}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
}

MapView.propTypes = propTypes;
export default MapView;