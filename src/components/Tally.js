import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions';

function Tally(props) {
  const result = props.info;
  const block = useSelector(state => state.counter.title);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <button onClick={() => dispatch(increment(result))}>
        <span className={`material-icons-outlined ${block.includes(result.Title) ? "control" : ""}`}>star_border</span>
      </button>
    </Fragment>
  )
}

export default Tally;
