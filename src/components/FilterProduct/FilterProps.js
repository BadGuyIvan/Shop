import React, { Fragment } from 'react';
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
import { initialState, fetchProps } from "../../redux/actions"

const styles = theme => ({
  root: {
    // width: '100%',
    // backgroundColor: theme.palette.background.paper,
    marginBottom: '15px'
  },
});

class FilterProps extends React.Component {
  state = {
    checked: [],
  };

//   componentDidMount(){
//     //   this.props.initialState();
//   }

  handleToggle = value => (event) => {
    event.stopPropagation();
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
        newChecked.splice(currentIndex, 1);
    }
    
    this.props.fetchProps(newChecked)
    console.log(newChecked);
    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, props } = this.props;
    console.log(props);
    return (
    //   <div className={classes.root}>
    <Fragment>
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
                        {props.value.map((value, index) => (
                            <ListItem
                                key={index}
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
                            <ListItemText primary={value} />
                            </ListItem>
                        ))}
                        </List>
                    </ExpansionPanelDetails>
                    </ExpansionPanel> 
                )
            })
        }
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