import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseLine from "@material-ui/core/CssBaseline";

import NavBar from "../NavBar/NavBar";
import Product from '../ProductList/ProductList';
import Category from '../Category/Category';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 4,
    },
  });

class App extends Component {
    state = {
        page: 1
      };

    onPageChange = page => {
        this.setState({page})
    }

    render(){
        const { classes } = this.props;
        return (
            <Fragment>               
                <CssBaseLine/>
                <NavBar/>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item className={classes.paper} xs={12} sm={2} >
                            <Category/>
                        </Grid>
                        <Grid item xs={12} sm={10} md={10}>
                            <Grid container>
                                <Grid item xs={12} sm={12}>
                                    <Search/>
                                </Grid>
                                <Product/>
                            </Grid>
                                <Pagination onChange={this.onPageChange} siblingPagesRange={2} currentPage={this.state.page} totalPages={100}/>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(App);