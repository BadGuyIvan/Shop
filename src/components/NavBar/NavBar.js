import React, { Fragment} from 'react';
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Cart } from 'mdi-material-ui'
import Grid from '@material-ui/core/Grid';
import { connect, } from 'react-redux';
import { Link } from "react-router-dom";

const styles = theme => ({
    appBar: {
        position: 'relative'
    },
    toolbarTitle: {
        flex: 1
    },
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    },
    wrapper: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    countProducts: {
        textAlign: 'center'
    }
})

const NavBar = (props) => {
    const { classes, order } = props;
    return (
        <Fragment>
            <AppBar position="static" color="default" className={classes.appBar}>
                <ToolBar>
                    <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
                    Shop
                    </Typography>

                    {
                        order.length !== 0 
                        ?
                            <Paper className={classes.paper}>
                            <Grid container >
                                <Grid container spacing={16} justify="space-between">
                                <Grid className={classes.wrapper} item xs={8} sm={8} md={8} lg={8}>  
                                <Typography className={classes.countProducts}>
                                       Your Cart: {order.length} Item(s)
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Button component={Link} to="/orders">
                                        <Cart/>
                                    </Button>  
                                </Grid>
                                </Grid>
                            </Grid>
                            </Paper>
                        :
                            <Button color="primary" variant="outlined">Login</Button>
                    }
                </ToolBar>
            </AppBar>
        </Fragment>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => {
    return {
        order: state.orders.product
    }
  }

export default connect(mapStateToProps)(withStyles(styles)(NavBar));