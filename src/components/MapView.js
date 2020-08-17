import React, {Component} from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  items: PropTypes.array.isRequired,
  isViewingSingle: PropTypes.bool.isRequired,
  style: PropTypes.shape().isRequired,
}

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

class MapView extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      markers: [],
    };
  }

  componentDidMount() {
    const {items} = this.props;
    this.setState({ markers : items.map((item, index) => (
        <Marker
          onClick={this.onMarkerClick}
          title={item.location}
          name={item.applicant}
          time={`${item.start24} - ${item.end24}`}
          item={item}
          position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}} 
          key={`marker-${index}`}
        />
      ))
    });
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render(){
    const {google, items, isViewingSingle, style} = this.props;

    const mapCenter = isViewingSingle ? {
      lat: parseFloat(items[0].latitude),
      lng: parseFloat(items[0].longitude)
    } : {
      lat: parseFloat(process.env.REACT_APP_SF_LAT),
      lng: parseFloat(process.env.REACT_APP_SF_LNG)
    };

    return (
      <div style={style}>
        <Map 
          google={google}
          initialCenter={mapCenter}
          zoom={13}
          onClick={this.onMapClicked}
        >
          {this.state.markers}
          <InfoWindow
            key={`info-window`}
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
          >  
            <div>
              <Typography variant="h5" component="h5">
                {this.state.selectedPlace.name}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Time: {this.state.selectedPlace.time}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="p">
                Address: {this.state.selectedPlace.title}
              </Typography>
            </div>
          </InfoWindow>
        </Map> 
      </div>
  );
  }
}

MapView.propTypes = propTypes;
export default GoogleApiWrapper({ apiKey: API_KEY })(MapView)
