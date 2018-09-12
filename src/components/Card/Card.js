import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProductToOrder } from "../../redux/actions"

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  typography: {
    overflow: 'hidden',
    height: '10vw',
    // position: 'relative',
    // line-height: 1.2em,
    // max-height: 6em,
    textAlign: 'justify',
    // marginRight: '-1em',
    // paddingRight: '1em',
  },
  buttonCart: {
    textTransform: 'uppercase'
  }
};

class CardProduct extends Component{
  
  fetchProduct = (event) => {
    // event.preventDefault();
    const { id, name, price } = this.props.data;
    const order = { id, name, price };
    this.props.fetchProductToOrder(order);
  }
  
  render(){
    const { classes, data } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={data.Images.length !== 0 ? data.Images[0].url: ''}
            title={data.name}
          />
          <CardContent>
            <Typography noWrap gutterBottom variant="headline" component="h2">
              {data.name}
            </Typography>
            <Typography gutterBottom component="h3">
              ${data.price}
            </Typography>
            <Typography className={classes.typography}  component="div">
              {data.description}
            </Typography>
          </CardContent>
          <CardActions >
            {/* <Button size="small">
            Learn More
            </Button> */}
            <Button className={classes.buttonCart} size="small" component={Link} to="/orders"
              onClick={this.fetchProduct}
            >
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CardProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchProductToOrder }, dispatch)
}


export default connect(null, mapDispatchToProps)(withStyles(styles)(CardProduct));