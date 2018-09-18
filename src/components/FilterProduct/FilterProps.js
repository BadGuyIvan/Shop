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
import { initialFilters, fetchProps } from "../../redux/actions"
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
    borderRadius: 4,
    // textAlign: 'center'
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
    props: []
  };

  handleToggle = value => (event) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    const filterProps = _.map(newChecked, object => {
      return _.pick(object, ['value','PropsId'])
    })

    this.props.fetchProps(filterProps)
    this.setState({
      checked: newChecked,
    });
  };

  checkedProps = (categories, props) => {
    return categories.length === 0 ? true : categories.includes(props.CategoryId)
  }

  render() {
    const { classes, props, categories, calculateProps, products } = this.props;
    return (
    <Fragment>
        <MuiThemeProvider theme={My_theme}>
          <div>
        {
            props && props.map((props, index) => {
                return (
                  <div key={index}>
                    {
                    this.checkedProps(categories, props) &&
                    <ExpansionPanel
                      className={classes.root}>
                    <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                        <Typography className={classes.heading}>
                            {props.name}
                        </Typography>
                    </ExpansionPanelSummary><ExpansionPanelDetails>
                        <List>
                        {
                          props.value.map((name, index) => (
                            <ListItem
                                key={index}
                                role={undefined}
                                dense
                                button
                                onClick={this.handleToggle(name)}
                                className={classes.listItem}
                                // disabled={}
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
                                        <ListItemText primary={
                                          <Grid container justify="center">
                                            <Grid item className={classes.countProduct}>
                                            {
                                              calculateProps.some(item => item === name.value)
                                              ? `+${
                                                name.productCount <= 1 ? name.productCount : products.length
                                              } ` : name.productCount
                                            }
                                            </Grid>
                                          </Grid>
                                        } />
                                    }
                                </Grid>
                            </Grid>
                            </ListItem>
                        ))}
                        </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    }
                    </div>
                )
            })
        }
        </div>
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
        props: state.initialFilters.props,
        categories: state.filter.categories,
        products: state.filter.products,
        calculateProps: state.filter.calculateProps.map(item => item.value)
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchProps }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterProps));