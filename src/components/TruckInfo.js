import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import FoodTruckIcon from './FoodTruckIcon';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GoogleMapReact from 'google-map-react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  displayContainer: {
    display: 'flex',
    padding: 32,
    justifyContent: 'space-around',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  text: {
    height: '100vh',
    width: '60%',
  },
  map: {
    height: 400,
    width: '30%',
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TruckInfo = (props) => {
  const classes = useStyles();
  const { truck } = props;

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              {truck.applicant}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Back
          </Button>
        </Toolbar>
        </AppBar>
        <div className={classes.displayContainer}>
          <div className={classes.text}>
              <h1>{truck.applicant}</h1>
              <h3>Opens at: {truck.start24}</h3>
              <h3>Closes at: {truck.end24}</h3>
              <h3>ColdTruck: {truck.coldtruck}</h3>
              <h3>Location: {truck.location}</h3>
              <h3>Description: {truck.locationdesc}</h3>
              <h3>Permit: {truck.permit}</h3>
              <h3>Lot: {truck.lot}</h3>
            </div>
            <div className={classes.map}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                defaultCenter={{lat: parseFloat(truck.latitude), lng: parseFloat(truck.longitude)}}
                defaultZoom={15}
              >
                <FoodTruckIcon
                  lat={parseFloat(truck.latitude)}
                  lng={parseFloat(truck.longitude)}
                  text={truck.applicant}
                />
              </GoogleMapReact>
          </div>
        </div>
    </Dialog>
  );
};

export default TruckInfo;