// import React from 'react';
// import PropTypes from 'prop-types';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import { ChevronDown } from 'mdi-material-ui';
// import { connect, } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { initialState, getProductsByCategory } from "../../redux/actions"
// import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// const styles = theme => ({
//   root: {
//       alignItems: 'center',
//       marginTop: '25px',
//       marginBottom: '10px',
//       width: '100%',
//       justifyContent: 'space-between',
//   },
//   [theme.breakpoints.up("xs")]: {
//     root: {
//         flexDirection: 'row'
//     }
//   },
//   [theme.breakpoints.up("sm")]: {
//     root: {
//         flexDirection: 'column'
//     }
//   },
//   [theme.breakpoints.up("md")]: {
//     root: {
//         flexDirection: 'column'
//     }
//   },
//   [theme.breakpoints.up("lg")]: {
//     root: {
//         flexDirection: 'column'
//     }
//   },
//   [theme.breakpoints.up("xl")]: {
//     root: {
//         flexDirection: 'column'
//     }
//   }
// });


// const MyTheme = createMuiTheme({
//     overrides: {
//         MuiBottomNavigationAction: {
//             root: {
//                 paddingLeft: 12,
//                 paddingRight: 12,
//                 paddingTop: '12px !important',
//                 paddingBottom: 12,
//                 width: '100%',
//                 // minHeight: '60px',
//                 justifyContent: 'center'
//             },
//             selected: {
//                 minWidth: 'none',
//                 maxWidth: 'none',
//                 width: '100%',
//                 backgroundColor: '#e0e0e0',
//                 color: '#000000'
//             }
//         },
//         MuiBottomNavigation: {
//             root: {
//                 height: 'auto',
//                 backgroundColor: 'none'
//             }
//         }
//     }
// });

// class Category extends React.Component {
//   state = {
//     value: null,
//   };

//   componentDidMount(){
//       this.props.initialState();
//   }

//   handleChange = (event, value) => {
//     event.stopPropagation();
//     const { target : { textContent }} = event;
//     this.props.getProductsByCategory(textContent);
//     this.setState({ value });
//   };

//   componentWillReceiveProps(nextProps){
//       if(nextProps.search !== this.props.search){
//           this.setState({value: null})
//       }
//   }

//   render() {
//     const { classes, categories } = this.props;
//     const { value } = this.state;
//     return (
//         <MuiThemeProvider theme={MyTheme}>
//         <div className={classes.root}>
//             <ExpansionPanel>
//               <ExpansionPanelSummary expandIcon={<ChevronDown />}>
//                 <Typography className={classes.heading}>
//                   Categories
//                 </Typography>
//               </ExpansionPanelSummary>
//               <ExpansionPanelDetails>
//                 <BottomNavigation
//                     value={value}
//                     onChange={this.handleChange}
//                     showLabels
//                     className={classes.root}
//                 >
//                 <BottomNavigationAction label={'All'} />
//                 {
//                     categories.map((category) => {
//                         return(
//                             <BottomNavigationAction key={category.id} label={category.name} />
//                         )
//                     })
//                 }
//                 </BottomNavigation>
//               </ExpansionPanelDetails>
//             </ExpansionPanel>
//           </div>
            
//         </MuiThemeProvider>
//     );
//   }
// }

// Category.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => {
//     return {
//         categories: state.initialState.categories,
//         search: state.filter.search,
//         pages: state.filter.pages,
//         sizePage: state.filter.sizePage,
//         price: state.initialState.price
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({ initialState, getProductsByCategory }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Category));

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import { initialState, changedCategory } from "../../redux/actions"

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: '15px'
  },
});

class CheckboxList extends React.Component {
  state = {
    checked: [],
  };

  componentDidMount(){
      this.props.initialState();
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
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ChevronDown />}>
          <Typography className={classes.heading}>
            Categories
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <List>
            {categories.map(value => (
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
                <ListItemText primary={value.name} />
                </ListItem>
            ))}
            </List>
        </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.initialState.categories,
        search: state.filter.search,
        pages: state.filter.pages,
        sizePage: state.filter.sizePage,
        price: state.initialState.price
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ initialState, changedCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckboxList));