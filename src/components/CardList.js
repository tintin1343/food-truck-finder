import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TruckInfo from './TruckInfo';
import injectSheet from 'react-jss';
import { green } from '@material-ui/core/colors';

const propTypes = {
  classes: PropTypes.shape({}).isRequired,
  items: PropTypes.array.isRequired,
}

const styles = {
  root: {
    width: 275,
    height: 300,
    margin: 8,
    backgroundColor: green['100'],
  },
  actionArea:{
    height: 300,
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
              <CardContent className={classes.actionArea}>
                <Typography variant="body1" component="h6">
                  {item.applicant.toUpperCase()} 
                </Typography>
                <Typography variant="caption" component="p">
                  {item.optionaltext}
                </Typography>
                <br/>
                <Typography variant="caption" component="p">
                  Time: {item.start24} - {item.end24}
                </Typography>
                <Typography variant="caption" component="p">
                  Address: {item.location.toLowerCase()}
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
