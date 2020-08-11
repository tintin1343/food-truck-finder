import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TruckInfo from './TruckInfo';
import injectSheet from 'react-jss';

const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  items: PropTypes.array.isRequired,
}

const styles = {
  root: {
    minWidth: 275,
    maxWidth: 275,
    height: 275,
    margin: 8,
  },
  media: {
    height: 140,
  },
};

const CardList = (props) => {
  const [truck, setTruck] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const { classes, items } = props;

  const handleClickOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleCardClick = (item) => {
    setTruck(item);
    handleClickOpen();
  }

  return (
    <React.Fragment>
      {
        items.map((item, index) => (
          <Card className={classes.root} key={index} onClick={() => handleCardClick(item)}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.applicant} 
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Day: {item.dayofweekstr} 
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Open: {item.start24}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Close: {item.end24}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.locationdesc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <TruckInfo open={open} handleClose={handleClose} truck={truck} />       
    </React.Fragment>
  );
};

CardList.propTypes = propTypes;
export default injectSheet(styles)(CardList);
