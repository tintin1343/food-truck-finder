import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MapView from './MapView';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  displayContainer: {
    display: 'flex',
    margin: 32,
    padding: 16,
    maxWidth: '100vw',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  scrollBody:{
    backgroundColor: deepPurple['50'],
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  text: {
    flexGrow: 1,
    width: '50%',
  },
  map: {
    flexGrow: 1,
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
    <Dialog fullScreen open={props.open} onClose={handleClose} TransitionComponent={Transition} className={classes.scrollBody}>
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
              <h2>{truck.applicant}</h2>
              <h4>Serves: {truck.optionaltext}</h4>
              <h5>Open between: {truck.start24} - {truck.end24}</h5>
              <h5>ColdTruck: {truck.coldtruck}</h5>
              <h5>Address: {truck.location}, Lot #: {truck.lot}, Block #: {truck.block}</h5>
              <h5>Location Description: {truck.locationdesc}</h5>
              <h5>Permit: {truck.permit}</h5>
              
            </div>
            <div className={classes.map}>
              <MapView 
                items={[props.truck]} 
                style={{ height: 400, position: 'relative', width: 400, padding: 20 }}
                isViewingSingle={true}
              />
          </div>
        </div>
    </Dialog>
  );
};

export default TruckInfo;