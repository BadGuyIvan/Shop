import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { ChevronDown } from 'mdi-material-ui';
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initialState, fetchProps } from "../../redux/actions"
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  root: {
    // width: '100%',
    // backgroundColor: theme.palette.background.paper,
    marginBottom: '15px'
  },
  listItem: {
    [theme.breakpoints.between('xs', 'xl')]: {
      padding: 0,
    }
  },
  countProduct: {
    display: 'block',
    textAlign: 'center',
    backgroundColor: "#8888",
    padding: 10,
    borderRadius: 4
  },
  invisible: {
    display: 'none'
  }
});


const My_theme = createMuiTheme({
    overrides: {
      MuiExpansionPanelDetails: {
        root: {
          padding: 0,
          margin: 0
        }
      },
      MuiList: {
        root: {
          width: '100%'
        }
      },
      MuiListItem: {
        root: {
          padding: 0,
          margin: 0
        },
        gutters: {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    }
  });

class FilterProps extends React.Component {
  state = {
    checked: [],
  };

//   componentDidMount(){
//     //   this.props.initialState();
//   }

  handleToggle = value => (event) => {
    // event.stopPropagation();
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }
    console.log(checked);    
    this.props.fetchProps(newChecked)
    // console.log(newChecked);
    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, props } = this.props;
    console.log(props.map(r => r.value));
    return (
    //   <div className={classes.root}>
    <Fragment>
        <MuiThemeProvider theme={My_theme}>
        {
            props && props.map((props, index) => {
                return (
                    <ExpansionPanel className={classes.root} key={index}>
                    <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                        <Typography className={classes.heading}>
                            {props.name}
                        </Typography>
                    </ExpansionPanelSummary><ExpansionPanelDetails>
                        <List>
                        {props.value.map((name, index) => (
                            <ListItem
                                key={index}
                                role={undefined}
                                dense
                                button
                                onClick={this.handleToggle(name)}
                                className={classes.listItem}
                            >
                            <Checkbox
                                checked={this.state.checked.indexOf(name) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                            <Grid container justify="center" alignItems="center">
                                <Grid item xs={8} sm={8} md={8} lg={8}>
                                    <ListItemText primary={name.value} />
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    {
                                        !this.state.checked.some(item => item.value === name.value) &&
                                        <ListItemText classes={{primary: classes.countProduct}} primary={name.productCount} />
                                    }
                                </Grid>
                            </Grid>
                            </ListItem>
                        ))}
                        </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                )
            })
        }
                    </MuiThemeProvider>
        </Fragment>
    );
  }
}

FilterProps.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        props: state.initialState.props,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchProps }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterProps));