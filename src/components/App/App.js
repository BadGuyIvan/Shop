import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseLine from "@material-ui/core/CssBaseline";
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from "../NavBar/NavBar";
import Product from '../ProductList/ProductList';
import Category from '../Category/Category';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import SizePage from '../SizePage/SizePage';
import FilterPrice from '../FilterProduct/FilterPrice';

import { Pagination as ActionPagination } from "../../redux/actions"

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 4,
    },
    filter: {
        textAlign: 'center',
        textTransform: 'uppercase'
    }
  });

class App extends Component {

    onPageChange = page => {
        this.props.ActionPagination(page)
    }

    render(){
        const { classes, pages, page } = this.props;
        return (
            <Fragment>               
                <CssBaseLine/>
                <NavBar/>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item className={classes.paper} xs={12} sm={3} md={2}>
                            <Category/>
                            <FilterPrice/>
                        </Grid>
                        <Grid item xs={12} sm={9} md={10}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Search/>
                                </Grid>
                                <Product/>
                            </Grid>
                            <Grid container justify="flex-end" alignContent="center" alignItems="center">
                                    <SizePage/>
                                    <Pagination onChange={this.onPageChange} 
                                                siblingPagesRange={2} 
                                                currentPage={page || 1} 
                                                totalPages={pages || 1}/>
                            </Grid>
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

  const mapStateToProps = state => {
    return {
        pages: state.filter.pages,
        page: state.filter.page,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ActionPagination }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(App));