import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const styles = {
  progressContainer: {
    margin: 20,
    padding: 20,
    justifyContent: 'center',
  },
};

const propTypes = {
  classes: PropTypes.shape({}).isRequired,
}

const LoadingIndicator = (props) => {
  const { classes } = props;

  return (
    <div className={classes.progressContainer}>
        <LinearProgress />
    </div>
  );
}

LoadingIndicator.propTypes = propTypes;
export default injectSheet(styles)(LoadingIndicator);