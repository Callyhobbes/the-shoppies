import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions';

function Tally(props) {
  const result = props.info;
  console.log(props.info.Title);
  const block = useSelector(state => state.counter.title);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <span className={`material-icons-outlined ${block.includes(result.Title) ? "control" : ""}`} onClick={() => dispatch(increment(result))}>star_border</span>
    </Fragment>
  )
}

export default Tally;
