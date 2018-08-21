import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';

import { getProductsByCategory } from "../../redux/actions"

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
        this.props.getProductsByCategory('Shoes');
    }
    render(){
      const { classes, product } = this.props;
        return (
          <Fragment>
            {
              product.map(item => {
                return (
                  <Grid item className={classes.paper} key={item.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Card image={item.Images[0].url} name={item.name} dscription={item.dscription}/>
                  </Grid>
                )
              })
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
          product: state.product.products
      }
  }
  
  const mapDispatchToProps = dispatch => {
      return bindActionCreators({ getProductsByCategory }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Content));