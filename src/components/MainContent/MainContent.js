import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Product from '../ProductList/ProductList';
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Categories from '../Categories/Categories';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import SizePage from '../SizePage/SizePage';
import FilterPrice from '../FilterProduct/FilterPrice';
import FilterProps from '../FilterProduct/FilterProps';
import { Pagination as ActionPagination, getAllProduct } from "../../redux/actions"

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

class MainContent extends Component {
    
    componentDidMount(){
        this.props.getAllProduct()
    }

    onPageChange = page => {
        this.props.ActionPagination(page)
    }

  render() {
    const { classes, pages, page, product } = this.props;
    const loading = product ? !!product.length : false
    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item className={classes.paper} xs={12} sm={3} md={2}>
                    <h1 className={classes.filter}>Filters</h1>
                    {
                    loading &&
                        <Fragment>
                            <Categories/>
                            <FilterPrice/>
                            <FilterProps/>
                        </Fragment>
                    }
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <Search/>
                        </Grid>
                        <Product/>
                    </Grid>
                    {
                    loading &&
                    <Grid container justify="flex-end" alignContent="center" alignItems="center">
                            <SizePage/>
                            <Pagination onChange={this.onPageChange} 
                                        siblingPagesRange={2} 
                                        currentPage={page || 1} 
                                        totalPages={pages || 1}/>
                    </Grid>}
                </Grid>
            </Grid>
        </div>
    )
  }
}

MainContent.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = state => {
    return {
        pages: state.filter.pages,
        page: state.filter.page,
        product: state.filter.products
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ ActionPagination, getAllProduct }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MainContent));