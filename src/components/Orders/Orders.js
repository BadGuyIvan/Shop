import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Address from '../Address/Address';
import { deleteProductFromOrder, addQt, discardQt, deleteOrder } from "../../redux/actions"


const styles = theme => ({
    root: {
      borderRadius: 0,
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 360,
    },
    buttonQt:{
      padding: '10px',
      minWidth: '15px',
      maxWidth: '35px'
    },
    wrapperNav:{
      textAlign: 'center',
      marginTop: theme.spacing.unit * 3
    },
    buttonCart: {
      textTransform: 'uppercase'
    },
    labelQt: {
      marginLeft: '15px',
      marginRight: '15px'
    },
    center: {
      textAlign: 'center',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
  });

const Success = () => {
  return(
    <Grid container justify="center" alignItems="center" direction='column'>
      <Grid item lg={12}>
        <h2>Your order has been successfully sent</h2>
      </Grid>
      <Grid item lg={12} justif='center'>
        <Button variant="outlined" size="small" component={Link} to="/">
          Continue Shopping
        </Button>
      </Grid>
    </Grid>
  )
}

class Orders extends Component {

  state = {
    email: '',
    address:'',
    successful: null,
    error: null
  }

  handleChange = event => {
    // const emaiRegex =  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
    const emaiRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!event.target.value.match(emaiRegex)){
      this.setState({
        error: true
      })
    }else {
      this.setState({
        error: false
      })
    }
    this.setState({
      email: event.target.value,
    });
    console.log(this.state.error);
  };
  handleChangeAddress = event => {
    // const emaiRegex =  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
    
    this.setState({
      address: event.target.value,
    });
  };
  deleteProduct = (id) => {
    this.props.deleteProductFromOrder(id)
  }

  addQuantity = (id) => {
    this.props.addQt(id)
  };

  discardQuantity = id => {
    this.props.discardQt(id)
  }

  SendOrder = (event) => {
    let order = {
      total: this.props.total,
      products: this.props.products,
      contact: this.state.email
    }
    if(this.state.error !== true && this.state.email.length !== 0){
      axios.post('/orders', {
        order
      })
      .then(response => this.setState({successful: response.data}))

      this.props.deleteOrder();
      localStorage.removeItem('order')
      localStorage.removeItem('total')
    } else {
      this.setState({
        error: true
      })
      setTimeout(() => {
        this.setState({
          error: false
        })
      }, 3000)
    }
  }

  SaveOrder = () => {
    const order = this.props.products;
    const total = this.props.total;
    localStorage.setItem('order', JSON.stringify(order));
    localStorage.setItem('total',total)
  }

  isEmpty = () => {
    if(this.state.error === true){
        this.setState({error: false});
    }
}

  render() {
    const { classes, products, total } = this.props;
    return (
        this.state.successful
        ? 
          <Success/> 
        :
        <Grid container justify="center" className={classes.root}>
          <Grid item lg={12} className={classes.center} component='h2'>
            Card
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="email"
            name="email"
            error={this.state.error}
            helperText={this.state.error && 'email field is not correctly'}
            fullWidth
            onBlur={this.isEmpty}
            className={classes.textField}
            value={this.state.email}
            // inputProps={{ email: `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/` }}
            onChange={this.handleChange}
            margin="normal"
          />
          <Address/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Price</TableCell>
                <TableCell numeric>Qt</TableCell>
                <TableCell numeric></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                products.map((product) => 
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell numeric>${product.price}</TableCell>
                    <TableCell numeric>
                      <Button className={classes.buttonQt} size="small" onClick={() => this.discardQuantity(product.id)}>-</Button>
                        <span className={classes.labelQt}>{product.qt}</span>
                      <Button className={classes.buttonQt} size="small"onClick={() => this.addQuantity(product.id)}>+</Button>
                      </TableCell>
                    <TableCell >
                      <Button color="secondary" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                )
              }
              <TableRow>
                <TableCell numeric colSpan={2} component="th" scope="row">
                  Total
                </TableCell>
                <TableCell numeric>${total}</TableCell>
                <TableCell numeric></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </Grid>
            <Grid item lg={12} className={ classes.wrapperNav }>
              <Button className={classes.buttonCart} variant="outlined" size="small" onClick={this.SaveOrder}  component={Link} to="/"
                  >
                    Continue Shopping
              </Button>
              <Button className={classes.buttonCart} variant="outlined" size="small" 
                      onClick={this.SendOrder}
                  >
                    CheckOut
              </Button>
            </Grid>
        </Grid>
    )
  }
}

Orders.propTypes = {
    classes: PropTypes.object.isRequired,
};  

const mapStateToProps = state => {
    return {
        products: state.orders.product,
        total: state.orders.total
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ deleteProductFromOrder, addQt, discardQt, deleteOrder }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Orders))