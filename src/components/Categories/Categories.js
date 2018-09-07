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

class Categories extends React.Component {
  state = {
    checked: [],
  };

  componentDidMount(){
      // this.props.initialState();
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
            { categories && categories.map(value => (
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

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        categories: state.initialState.categories
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ initialState, changedCategory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Categories));