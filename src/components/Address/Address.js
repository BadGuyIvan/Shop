import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addres_latLng } from "../../redux/actions"

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
       .then(results =>{
         this.setState({
           address: results[0].formatted_address
         })
         return  getLatLng(results[0])
       }
      )
      .then(lantlng => {
        const order = {
          address_latLng: lantlng,
          address: this.state.address,
          isAddressValid: false
        }
        this.props.addres_latLng(order)
        this.setState({
        })
      })
      .catch(error => console.error('Error', error));
  };

  componentDidMount(){
    this.setState({
      address: this.props.address
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField 
                fullWidth
                className={classes.textField}
                label="Address"
                name="address"
                error={this.props.isAddressValid}
                helperText={this.props.isAddressValid && 'Address field is not correctly'}
              {...getInputProps()}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : '0suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.orders.address,
    isAddressValid: state.orders.isAddressValid
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addres_latLng }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LocationSearchInput));