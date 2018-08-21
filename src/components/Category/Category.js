import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategory, getProductsByCategory } from "../../redux/actions"
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  [theme.breakpoints.up("xs")]: {
    root: {
        flexDirection: 'row'
    }
  },
  [theme.breakpoints.up("sm")]: {
    root: {
        flexDirection: 'column'
    }
  },
  [theme.breakpoints.up("md")]: {
    root: {
        flexDirection: 'column'
    }
  },
  [theme.breakpoints.up("lg")]: {
    root: {
        flexDirection: 'column'
    }
  },
  [theme.breakpoints.up("xl")]: {
    root: {
        flexDirection: 'column'
    }
  }
});


const MyTheme = createMuiTheme({
    overrides: {
        MuiBottomNavigationAction: {
            root: {
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: '12px !important',
                paddingBottom: 12,
                // minHeight: '60px',
                justifyContent: 'center'
            },
            selected: {
                minWidth: 'none',
                maxWidth: 'none',
                width: '100%',
                backgroundColor: '#e0e0e0',
                color: '#000000'
            }
        },
        MuiBottomNavigation: {
            root: {
                height: 'auto',
                backgroundColor: 'none'
            }
        }
    }
});

class Category extends React.Component {
  state = {
    value: 0,
  };

    componentDidMount(){
      this.props.getCategory();
  }

  handleChange = (event, value) => {
    event.stopPropagation();
    const { target : { textContent }} = event;
    this.props.getProductsByCategory(textContent);
    this.setState({ value });
  };

  render() {
    const { classes, categories } = this.props;
    const { value } = this.state;

    return (
        <MuiThemeProvider theme={MyTheme}>
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
            {
                categories.map((category, index) => {
                    return(
                        <BottomNavigationAction key={category.id} label={category.name} />
                    )
                })
            }
            </BottomNavigation>
        </MuiThemeProvider>
    );
  }
}

Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.category.categories
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getCategory, getProductsByCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Category));