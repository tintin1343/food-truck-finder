import React, {Component} from 'react';
import CardList from './components/CardList';
import FormControl from '@material-ui/core/FormControl';
import injectSheet from 'react-jss';
import InputLabel from '@material-ui/core/InputLabel';
import MapView from './components/MapView';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import './App.css';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 20,
    justifyContent: 'flex-start',
  },
  dropdown: {
    display: 'flex',
    flexDirection : 'column',
    alignContent: 'center',
    width: 200,
  },
  formControl: {
    fontSize: 15,
  },
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


class FoodTruckApp extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
  }
  constructor(props){
    super(props);
    const currentDate = moment().zone(process.env.REACT_APP_SF_TIMEZONE_OFFSET);
    const currentTime = `${currentDate.hour()}:${currentDate.minute()}`; 
    this.state = {
      items: [],
      currentTime,
      day: currentDate.day(),
      view: '1',
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData = () =>{
    const { 
      day,
      currentTime,
    } = this.state;
    const url = `https://data.sfgov.org/resource/jjew-r69b.json?dayorder=${day}&$where='${currentTime}' between start24 and end24`;
    try{
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        // console.log('data ', data);
        this.setState({ items: data})
      })
    }
    catch(exception) {
       console.log('Exception ', exception);
    }
  }

  handleChange = (e) => {
    console.log('in handlechange ', e.target.value);
    const selected = e.target.value;
    this.setState({ view : selected });
  };

  handleDayChange = (e) => {
    console.log('in handleDaychange ', e.target.value);
    const newDay = e.target.value;
    this.setState({ day: newDay }, this.getData);

  };

  render() {
    const { items, view, day } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <h1>Food Trucks</h1>
        <div className={classes.dropdown}> 
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="view-simple">Select View</InputLabel>
            <Select
              native
              value={view}
              onChange={this.handleChange}
              inputProps={{
                name: 'view',
                id: 'view-simple',
              }}
            >
              <option aria-label="list" value={1}>List</option>
              <option aria-label="map" value={2}>Map</option>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="day-simple">Select Day</InputLabel>
            <Select
              native
              value={day}
              onChange={this.handleDayChange}
              inputProps={{
                name: 'day',
                id: 'day-simple',
              }}
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
        <div className={classes.container}>
          {view === '1' ? <CardList items={items} /> : <MapView items={items} />}
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(FoodTruckApp);
