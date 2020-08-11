import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    display: 'flex',
    // flexDirection : 'column',
    alignContent: 'center',
    width: 400,
  },
  formControl: {
    fontSize: 15,
    margin: 32,
  },
  siteRoot: {
    margin: 32,
  },
  selectView: {
    width: 150,
  },
  selectDay: {
    width: 150,
  },
  label: {
    width: 150,
  }
}));

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleDayChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
}

const Filters = (props) => {
  const {
    day,
    handleChange,
    handleDayChange,
    items,
    view,
  } = props;

  const classes = useStyles();

  return(
    <div className={classes.dropdown}> 
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label} htmlFor="view-simple">Select View</InputLabel>
        <Select
          disabled= {!items.length}
          native
          value={view}
          onChange={handleChange}
          inputProps={{
            name: 'view',
            id: 'view-simple',
          }}
          className={classes.selectView}
        >
          <option aria-label="list" value={1}>List</option>
          <option aria-label="map" value={2}>Map</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label} htmlFor="day-simple">Select Day</InputLabel>
        <Select
          native
          value={day}
          onChange={handleDayChange}
          inputProps={{
            name: 'day',
            id: 'day-simple',
          }}
          className={classes.selectDay}
        >
          <option aria-label="Sunday" value={0}>Sunday</option>
          <option aria-label="Monday" value={1}>Monday</option>
          <option aria-label="Tuesday" value={2}>Tuesday</option>
          <option aria-label="Wednesday" value={3}>Wednesday</option>
          <option aria-label="Thursday" value={4}>Thursday</option>
          <option aria-label="Friday" value={5}>Friday</option>
          <option aria-label="Saturday" value={6}>Saturday</option>
        </Select>
      </FormControl>
    </div>
  );
}

Filters.propTypes = propTypes;
export default Filters;