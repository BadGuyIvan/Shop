import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ChevronDown } from 'mdi-material-ui';
import Button from '@material-ui/core/Button';
import Slider from 'rc-slider';

import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProductsByPrice } from "../../redux/actions"

import 'rc-slider/assets/index.css';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    width: '50%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class SimpleExpansionPanel extends Component {

  state = {
    lowerBound: 0,
    upperBound: 0,
  };
  // onSliderChange =(value) => {
  //     const [ min, max ] = value
  //     const { category, sizePage } = this.props;

  //     this.setState({
  //       min,
  //       max
  //     })

  //     this.props.getProductsByPrice({ category, page: 1, sizePage, min, max })
  // }

  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: e.target.value});
  }

  onUpperBoundChange = (e) => {
    this.setState({ upperBound: e.target.value});
  }

  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    const { category, sizePage } = this.props;
    this.props.getProductsByPrice({ category, page: 1, sizePage, min: Number(lowerBound), max: Number(upperBound) })
  }

  checkLowerPrice = () => {
    if(this.state.lowerBound <= this.props.price.min){
      this.setState({lowerBound: this.props.price.min})
    } else if(this.state.lowerBound >= this.props.price.max){
      this.setState({lowerBound: this.props.price.max}) 
    }
  }

  checkUpperPrice = () => {
    if(this.state.upperBound <= this.props.price.min){
      this.setState({upperBound: this.props.price.min})
    } else if(this.state.upperBound >= this.props.price.max){
      this.setState({upperBound: this.props.price.max}) 
    }
  }

    render(){
        const { classes, price } = this.props;
        const { min, max }  = price;
        return (
          <div className={classes.root}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                <Typography className={classes.heading}>
                  Price
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container justify='space-around' alignItems="center" spacing={8}>
                  <Grid item xs={4} md={6}>
                    <TextField
                      label="lower price"
                      inputProps={{ min: min, max: max, step: "1" }} 
                      value={this.state.lowerBound}
                      onChange={this.onLowerBoundChange}
                      onBlur={this.checkLowerPrice}
                      className={classes.textField}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4} md={6}>
                    <TextField
                      label='upper price'
                      inputProps={{ min: min, max: max, step: "1" }} 
                      value={this.state.upperBound}
                      onChange={this.onUpperBoundChange}
                      onBlur={this.checkUpperPrice}
                      className={classes.textField}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                <Grid item xs={4} md={12}>
                  <Button variant="contained" className={classes.button} onClick={this.handleApply}>
                    Default
                  </Button>
                </Grid>
              </Grid>
                 {/* <Range allowCross={false} 
                  defaultValue={[min||0, max||9999]}
                  value={[this.state.lowerBound,this.state.upperBound]}
                  min={min||0}
                  max={max||9999} 
                  onChange={this.onSliderChange} /> */}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        );
    }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
      category: state.filter.category,
      sizePage: state.filter.sizePage,
      price: state.initialState.price,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getProductsByPrice }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SimpleExpansionPanel));