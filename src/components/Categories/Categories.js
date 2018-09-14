import React from 'react';
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
import { initialFilters, changedCategory } from "../../redux/actions"
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: '15px',
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

class Categories extends React.Component {
  state = {
    checked: []
  };

  componentDidMount(){
      this.props.initialFilters();
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    const categoryId = newChecked.map(category => category.id);
    this.props.changedCategory(categoryId);

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, categories } = this.props;
    return (
      <div className={classes.root}>
      <MuiThemeProvider theme={My_theme}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ChevronDown />}>
            <Typography className={classes.heading}>
              Categories
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
              <List>
              { categories && categories.map((value, index) => (
                  <ListItem
                  key={value.id}
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle(value)}
                  className={classes.listItem}
                  >
                  <Checkbox
                      checked={this.state.checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                  />
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                      <ListItemText primary={value.name} />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                    {
                      !this.state.checked.some(item => item.name === value.name) &&
                      <ListItemText classes={{primary: classes.countProduct}} primary={value.productCount} />
                    }
                    </Grid>
                  </Grid>
                  </ListItem>
              ))}
              </List>
          </ExpansionPanelDetails>
          </ExpansionPanel>
        </MuiThemeProvider>
      </div>
    );
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.initialFilters.categories
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ initialFilters, changedCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Categories));