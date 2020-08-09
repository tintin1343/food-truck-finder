import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.array.isRequired,
}

const FoodTruck = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    <LocalShippingIcon />
  </div>
);

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
            <FoodTruck
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