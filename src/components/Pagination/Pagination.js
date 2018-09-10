import React from 'react';
import {createUltimatePagination, ITEM_TYPES} from 'react-ultimate-pagination';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { PageFirst, PageLast, ChevronLeft, ChevronRight } from 'mdi-material-ui'
import { withStyles } from '@material-ui/core/styles';
const ButtonStyle = {
  minWidth: 36
};

const styles = theme => ({
  [theme.breakpoints.between('xs', 'sm')] : {
    wrapper: {
    display: 'flex',
    justifyContent: 'flex-end'
    }
  },
  [theme.breakpoints.between('md', 'xl')] : {
    wrapper: {
      display: 'flex',
      justifyContent: 'center'
    }
  }
})

const Page = ({value, isActive, onClick, isDisabled}) => (
  <Button
    style={ButtonStyle}
    children={value.toString()}
    variant={isActive ? "contained": 'text'} 
    color={isActive ? 'primary' : 'default' } 
    onClick={onClick}
    disabled={isDisabled}
  />
);

const Ellipsis = ({onClick, isDisabled}) => (
  <Button
    style={ButtonStyle}
    children={"..."}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const FirstPageLink = ({isActive, onClick, isDisabled}) => (
  <Button
    style={ButtonStyle}
    children={<PageFirst/>}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const PreviousPageLink = ({isActive, onClick, isDisabled}) => (
  <Button
    style={ButtonStyle}
    children={<ChevronLeft/>}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const NextPageLink = ({isActive, onClick, isDisabled}) => (
  <Button
    style={ButtonStyle}
    children={<ChevronRight/>}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const LastPageLink = ({isActive, onClick, isDisabled}) => (
  <Button
    style={ButtonStyle}
    children={<PageLast/>}
    onClick={onClick}
    disabled={isDisabled}
  />
);

const Wrapper = (props) => {
  const { classes } = props;
  return (
    // className={classes.wrapper}
          <div>
              {props.children}
          </div>
          )
}

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

const UltimatePaginationMaterialUi = createUltimatePagination({itemTypeToComponent, WrapperComponent: Wrapper});

export default withStyles(styles)(UltimatePaginationMaterialUi);