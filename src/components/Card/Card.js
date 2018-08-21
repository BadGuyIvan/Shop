import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
  }
};

function CardProduct(props) {
  const { classes, image, name, dscription } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography noWrap gutterBottom variant="headline" component="h2">
            {name}
          </Typography>
          <Typography className={classes.typography}  component="div">
            {dscription}
          </Typography>
        </CardContent>
        <CardActions >
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

CardProduct.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardProduct);