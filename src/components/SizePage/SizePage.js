import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changedSizePage } from "../../redux/actions";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class NativeSelects extends React.Component {

    state = {
        sizePage: 8
    }

  handleChange = event => {
      this.props.changedSizePage(Number(event.target.value));
      this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="sizePage-label-placeholder">
            SizePage
          </InputLabel>
          <NativeSelect
            value={this.state.sizePage}
            onChange={this.handleChange}
            input={<Input name="sizePage" id="sizePage-label-placeholder" />}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

NativeSelects.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        category: state.filter.category,
        search: state.filter.search,
        sizePage: state.filter.sizePage,
        page: state.filter.page,
        price: state.filter.price
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ changedSizePage }, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(NativeSelects));