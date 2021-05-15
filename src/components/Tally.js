import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions';

function Tally() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <span className="material-icons-outlined" onClick={() => dispatch(increment())}>favorite_border</span>
    </Fragment>
  )
}

export default Tally;
