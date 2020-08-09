import React from 'react';
import Typography from '@material-ui/core/Typography';

const EmptyList = (props) => {
 return(
    <Typography gutterBottom variant="h5" component="h2">
      No food trucks are open yet. Try again later. 
    </Typography>
  );
}

export default EmptyList;