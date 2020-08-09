import React from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const FoodTruckIcon = ({ text }) => (
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

  export default FoodTruckIcon;
