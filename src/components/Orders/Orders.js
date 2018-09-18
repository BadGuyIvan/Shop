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
import { deleteProductFromOrder, addQt, discardQt, deleteOrder,addres_latLng } from "../../redux/actions"


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
    ColQT: {
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    [theme.breakpoints.between('xs', 'xl')] : {
      ColQT: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
    },
    // [theme.breakpoints.only('xs')]: {
    //   labelQT: {
    //     textAlign: 'center'
    //   },
    // },[theme.breakpoints.only('sm')]: {
    //   labelQT: {
    //     textAlign: 'center'
    //   },
    // },
    // [theme.breakpoints.between('md', 'xl')] : {
    //   labelQT: {
    //     textAlign: 'right'
    //   },
    // }
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
    latlng: [],
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
    if(this.state.error !== true && this.state.email.length > 5 && !this.props.isAddressValid){
      const deliver_information = {
        "contacts": this.props.email,
        "address_from": "Львів, Львівська область, Україна",
        "point_from": {
             "type": "Point",
             "coordinates": [
                 49.839683,
                 24.029717000000005
             ]
         },
         "address_to": this.props.address,
         "point_to": {
           "type": "Point",
           "coordinates": [
             this.props.address.lat,
             this.props.address.lnt
           ]
         }
      }
      axios.post('https://mydeliveryapp.herokuapp.com/api/orders', 
      {
        ...deliver_information
      }, {
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers"
      })
      .then(address => {
        axios.post('/orders', {
          order: {
            total: this.props.total,
            products: this.props.products,
            contact: this.state.email,
            trackCode: address.data.track_code
          }
        })
        .then(response => this.setState({successful: response.data}))
      })
      .catch(err => console.log(err))

      this.props.deleteOrder();
      localStorage.removeItem('order')
      localStorage.removeItem('total')
      localStorage.removeItem('address')
      localStorage.removeItem('latlnt')
      localStorage.removeItem('email')
      localStorage.removeItem('isAddressValid')
    }

    if( this.state.email.length === 0 )
    {
      this.setState({
        error: true
      })
    }
    
    if(this.props.address.length === 0){
      this.props.addres_latLng({
        isAddressValid: true
      })
    } 
  }

  SaveOrder = () => {
    const order = this.props.products;
    const total = this.props.total;
    this.props.addres_latLng({email: this.state.email});
    localStorage.setItem('order', JSON.stringify(order));
    localStorage.setItem('total',total)
    localStorage.setItem('address',this.props.address)
    localStorage.setItem('latlnt',JSON.stringify(this.props.latlng))
    localStorage.setItem('email',this.state.email)
    localStorage.setItem('isAddressValid',this.props.isAddressValid)
  }

//   isEmpty = () => {
//     if(this.state.error === true){
//         this.setState({error: false});
//     }
// }

  isAddressValid = (error) => {
    console.log(error)
  }

  componentDidMount(){
    this.setState({
      address: this.props.address,
      email: this.props.email
    })
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
            // onBlur={this.isEmpty}
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
                <TableCell numeric className={classes.labelQT}>Qt</TableCell>
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
                      <div className={classes.ColQT}>
                        <Button className={classes.buttonQt} size="small" onClick={() => this.discardQuantity(product.id)}>-</Button>
                          <span className={classes.labelQt}>{product.qt}</span>
                        <Button className={classes.buttonQt} size="small"onClick={() => this.addQuantity(product.id)}>+</Button>
                      </div>
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
        total: state.orders.total,
        latlng: state.orders.address_latLng,
        address: state.orders.address,
        email: state.orders.email,
        isAddressValid: state.orders.isAddressValid
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ deleteProductFromOrder, addQt, discardQt, deleteOrder, addres_latLng }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Orders))