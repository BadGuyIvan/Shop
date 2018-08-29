import React , { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Magnify } from 'mdi-material-ui'
import { getProductsBySearch } from "../../redux/actions"

const styles = theme => ({
    iconContainer: {
        textAlign: 'center'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '100%',
    }
  });

class Search extends Component {

    state = {
        search: '',
        error: false
    }

    handleChange = name => event => {
        if(!event.target.value){
            this.setState({error: true})
        } else {
            this.setState({error: false})
        }
            this.setState({
              [name]: event.target.value,
            });
      };

    Search = (event) => {
        if(!this.state.error && this.state.search){
            if(event.key == 'Enter'){
                this.props.getProductsBySearch(this.state.search);
                this.setState({search: ''})
             }
        }
    }

    SearchByClick = () => {
        const { sizePage } = this.props
        if(!this.state.error && this.state.search){
            this.props.getProductsBySearch(this.state.search);
            this.setState({search: ''})
        }
    }

    isEmpty = () => {
        if(this.state.error === true){
            this.setState({error: false});
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid container wrap='wrap' justify="center" alignItems="center">
                <Grid item xs={10} sm={10} md={11}>
                    <TextField
                        id="search"
                        label="Search field"
                        type="search"
                        helperText={this.state.error && 'Search field is Empty'}
                        onBlur={this.isEmpty}
                        value={this.state.search}
                        error={this.state.error}
                        onChange={this.handleChange('search')}
                        onKeyPress={this.Search}
                        className={classes.textField}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid className={classes.iconContainer} item xs={2} sm={2} md={1}>
                    <IconButton onClick={this.SearchByClick} >
                        <Magnify/>
                    </IconButton>
                </Grid>
            </Grid>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => {
    return {
        sizePage: state.filter.sizePage
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ getProductsBySearch }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Search));