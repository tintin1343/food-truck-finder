import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import injectSheet from 'react-jss';

const propTypes = {
  classes: PropTypes.shape({}).isRequired,
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
  const { classes, items } = props;
  return (
      items.map((item, index) => (
        <Card className={classes.root} key={index}>
            <CardContent>
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
        </Card>
    ))
  );
};

CardList.propTypes = propTypes;
export default injectSheet(styles)(CardList);
