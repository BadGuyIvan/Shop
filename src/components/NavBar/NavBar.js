import React, { Fragment} from 'react';
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    appBar: {
        position: 'relative'
    },
    toolbarTitle: {
        flex: 1
    }
})

const NavBar = (props) => {
    const { classes } = props;
    return (
        <Fragment>
            <AppBar position="static" color="default" className={classes.appBar}>
                <ToolBar>
                    <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
                    Shop
                    </Typography>
                <Button color="primary" variant="outlined">Login</Button>
                </ToolBar>
            </AppBar>
        </Fragment>
    )
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(NavBar);