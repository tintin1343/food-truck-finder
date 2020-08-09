import React, {Component} from 'react';
import CardList from './components/CardList';
import injectSheet from 'react-jss';
import MapView from './components/MapView';
import EmptyList from './components/EmptyList';
import LoadingIndicator from './components/LoadingIndicator';
import PropTypes from 'prop-types';
import moment from 'moment';
import './App.css';
import Filters from './components/Filters';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 20,
    justifyContent: 'flex-start',
  },
  siteRoot: {
    margin: 32,
  },
};


class FoodTruckApp extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
  }
  constructor(props){
    super(props);
    const currentDate = this.getCurrentDate();
    const currentTime = this.getCurrentTime();

    this.state = {
      currentTime,
      day: currentDate.day(),
      isLoading: false,
      items: [],
      time: currentDate.format('hh:mm:ss A'),
      view: '1',
    };
  }

  componentDidMount(){
    this.getData();
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    const currentDate = this.getCurrentDate();
    this.setState({ time: currentDate.format('hh:mm:ss A')});
  };

  getTimeFormat = (number) => {
    return number < 10 ? `0${number}` : number;
  }

  getCurrentTime = () => {
    const currentDate = this.getCurrentDate();
    const hour = this.getTimeFormat(currentDate.hour());
    const minute = this.getTimeFormat(currentDate.minute());
    return `${hour}:${minute}`; 
  }

  getCurrentDate = () => {
    return moment().zone(process.env.REACT_APP_SF_TIMEZONE_OFFSET);
  }

  getData = () =>{
    const { 
      day,
      currentTime,
    } = this.state;
    
    const url = `https://data.sfgov.org/resource/jjew-r69b.json?dayorder=${day}&$where='${currentTime}' between start24 and end24`;
 
    try{
      this.setState({ isLoading : true });
      fetch(url)
      .then(res => res.json())
      .then((data) => { 
          this.setState({
          items: data,
          isLoading: false,
        }) 
      });
    }
    catch(exception) {
       console.log('Exception ', exception);
    }
  }

  handleChange = (e) => {
    const selected = e.target.value;
    this.setState({ view : selected });
  };

  handleDayChange = (e) => {
    const newDay = e.target.value;
    this.setState({ day: newDay }, this.getData);

  };

  render() {
    const {
      items,
      view,
      day,
      time,
      isLoading,
    } = this.state;

    const { classes } = this.props;

    return (
      <div className={classes.siteRoot}>
        <h1>Food Trucks In San Fransisco</h1>
        <h2>Current Time In San Fransisco: {time}</h2>
        <Filters
          items={items}
          day={day}
          view={view}
          handleChange={this.handleChange}
          handleDayChange={this.handleChange}
        />
        {!isLoading ?
          (
            <div className={classes.container}>
              {items.length  
                ? (view === '1' ? <CardList items={items} /> : <MapView items={items} />) 
                : <EmptyList />
              }
            </div>
          )
          : <LoadingIndicator /> 
        }
      </div>
    );
  }
}

export default injectSheet(styles)(FoodTruckApp);
