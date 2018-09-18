import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getAllProduct } from "../../redux/actions"

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 4,
    },
  });

  class Content extends Component {
    componentDidMount(){
        // this.props.getAllProduct()
    }
    render(){
      const { classes, product } = this.props;
      const loading = product ? product.length : false
        return (
          <Fragment>
            {
              loading ? product.map((item) => {
                return (
                  <Grid item className={classes.paper} key={item.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card image={typeof item.Images !== 'undefined' ? item.Images : []} data={item}/>
                  </Grid>
                )
              })
              :
              <Grid container justify='center'>
                <CircularProgress className={classes.progress} size={50} />
              </Grid>
            }
          </Fragment>
        )
    }
  }

  Content.propTypes = {
      classes: PropTypes.object.isRequired,
    };

  const mapStateToProps = state => {
      return {
          product: state.filter.products
      }
  }
  
  const mapDispatchToProps = dispatch => {
      return bindActionCreators({ getAllProduct }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));