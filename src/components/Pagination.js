import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(4),
    },
    "& ul": {
      display: "flex",
      justifyContent: "center"
    }
  },
}));

export default function PaginationOutlined({getItem}) {
  const classes = useStyles();

  const delayGet = () => setTimeout(getItem, 0)

  const totalCards = useSelector(state => state.cards.total)
  let pages = Math.ceil(totalCards/3)
  return (
    <div className={classes.root}>
      <Pagination onClick={() => delayGet()} count={pages} variant="outlined" color="primary" />
    </div>
  );
}